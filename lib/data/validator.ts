import type { RawEmployeeRow, ValidationResult } from "@/lib/types/employee";

const REQUIRED_COLUMNS: (keyof RawEmployeeRow)[] = [
  "employeeId",
  "name",
  "title",
  "department",
  "level",
  "reportingManagerId",
];

export function validateColumns(
  columns: string[]
): { valid: boolean; missing: string[] } {
  const lowerColumns = columns.map((c) => c.toLowerCase().trim());
  const missing = REQUIRED_COLUMNS.filter(
    (req) => !lowerColumns.includes(req.toLowerCase())
  );
  return { valid: missing.length === 0, missing };
}

export function validateData(rows: RawEmployeeRow[]): ValidationResult {
  const errors: ValidationResult["errors"] = [];
  const warnings: string[] = [];

  if (rows.length === 0) {
    errors.push({
      type: "invalid_row",
      message: "Dataset is empty — no employee rows found.",
    });
    return { valid: false, errors, warnings };
  }

  const idSet = new Set<string>();
  for (const row of rows) {
    if (idSet.has(row.employeeId)) {
      errors.push({
        type: "duplicate_id",
        message: `Duplicate employeeId: ${row.employeeId}`,
        details: `Employee "${row.name}" has a duplicate ID.`,
      });
    }
    idSet.add(row.employeeId);

    for (const col of REQUIRED_COLUMNS) {
      if (col === "reportingManagerId") continue;
      if (!row[col] || String(row[col]).trim() === "") {
        errors.push({
          type: "invalid_row",
          message: `Missing required field "${col}" for employee ${row.employeeId}`,
          details: `Employee "${row.name || row.employeeId}" is missing "${col}".`,
        });
      }
    }
  }

  const circularError = detectCircularReporting(rows);
  if (circularError) {
    errors.push(circularError);
  }

  const roots = rows.filter(
    (r) => !r.reportingManagerId || r.reportingManagerId.trim() === ""
  );
  if (roots.length === 0) {
    warnings.push(
      "No root node found (all employees have a reportingManagerId). Check data for a missing CEO/root entry."
    );
  }

  const managerIds = new Set(rows.map((r) => r.employeeId));
  for (const row of rows) {
    if (
      row.reportingManagerId &&
      row.reportingManagerId.trim() !== "" &&
      !managerIds.has(row.reportingManagerId)
    ) {
      warnings.push(
        `Employee "${row.name}" (${row.employeeId}) reports to unknown manager ID "${row.reportingManagerId}". They will be treated as a secondary root.`
      );
    }
  }

  return { valid: errors.length === 0, errors, warnings };
}

function detectCircularReporting(
  rows: RawEmployeeRow[]
): ValidationResult["errors"][number] | null {
  const managerMap = new Map<string, string | null>();
  for (const row of rows) {
    managerMap.set(row.employeeId, row.reportingManagerId || null);
  }

  for (const startId of managerMap.keys()) {
    const visited = new Set<string>();
    let current: string | null = startId;

    while (current) {
      if (visited.has(current)) {
        return {
          type: "circular_reference",
          message: `Circular reporting chain detected involving employee "${current}".`,
          details: `Chain: ${[...visited, current].join(" → ")}`,
        };
      }
      visited.add(current);
      current = managerMap.get(current) ?? null;
    }
  }

  return null;
}
