import * as XLSX from "xlsx";
import type { RawEmployeeRow } from "@/lib/types/employee";

function cellToString(value: unknown): string {
  if (value === null || value === undefined) return "";
  return String(value).trim();
}

function normalizeColName(raw: string): string {
  return raw.toLowerCase().replace(/[\s_\-/()]/g, "");
}

/**
 * New HR sheet column headers (normalized for matching).
 * Maps Excel headers to internal field names.
 */
const HR_SHEET_HEADERS: Record<keyof Omit<RawEmployeeRow, "skills">, string> = {
  employeeId: "employeeid",
  name: "employeenameasperkeka",
  title: "jobtitlekeka",
  level: "level",
  department: "department",
  reportingManagerId: "skillmanager",
  employmentType: "businessunit",
  project: "projecttrack",
  skill: "skill",
};

function resolveColumnIndices(headerRow: unknown[]): Record<keyof Omit<RawEmployeeRow, "skills">, number> {
  const headerMap = new Map<string, number>();
  for (let j = 0; j < headerRow.length; j++) {
    const normalized = normalizeColName(cellToString(headerRow[j]));
    if (normalized) headerMap.set(normalized, j);
  }

  const resolve = (field: string): number => headerMap.get(field) ?? -1;

  return {
    employeeId: resolve(HR_SHEET_HEADERS.employeeId),
    name: resolve(HR_SHEET_HEADERS.name),
    title: resolve(HR_SHEET_HEADERS.title),
    level: resolve(HR_SHEET_HEADERS.level),
    department: resolve(HR_SHEET_HEADERS.department),
    reportingManagerId: resolve(HR_SHEET_HEADERS.reportingManagerId),
    employmentType: resolve(HR_SHEET_HEADERS.employmentType),
    project: resolve(HR_SHEET_HEADERS.project),
    skill: resolve(HR_SHEET_HEADERS.skill),
  };
}

export async function parseExcelFile(file: File): Promise<RawEmployeeRow[]> {
  const buffer = await file.arrayBuffer();
  const workbook = XLSX.read(buffer, { type: "array" });

  const sheetName = workbook.SheetNames[0];
  if (!sheetName) {
    throw new Error("The uploaded file contains no sheets.");
  }

  const sheet = workbook.Sheets[sheetName];
  const rows = XLSX.utils.sheet_to_json<unknown[]>(sheet, {
    header: 1,
    defval: "",
    raw: false,
  });

  if (rows.length < 2) {
    throw new Error(
      "The uploaded sheet must contain a header row and at least one data row."
    );
  }

  const idx = resolveColumnIndices(rows[0] as unknown[]);

  if (idx.employeeId === -1) {
    throw new Error(
      "Could not find 'Employee ID' column. Headers found: " +
        (rows[0] as unknown[]).map(cellToString).join(", ")
    );
  }

  if (idx.name === -1) {
    throw new Error(
      "Could not find 'Employee Name (As Per Keka)' column. Headers found: " +
        (rows[0] as unknown[]).map(cellToString).join(", ")
    );
  }

  const dataRows = rows.slice(1);
  const result: RawEmployeeRow[] = [];
  const managerNames: string[] = [];

  for (let i = 0; i < dataRows.length; i++) {
    const row = dataRows[i] as unknown[];

    const employeeId = idx.employeeId >= 0 ? cellToString(row[idx.employeeId]) : "";
    if (!employeeId) continue;

    const name = idx.name >= 0 ? cellToString(row[idx.name]) : "";
    const title = idx.title >= 0 ? cellToString(row[idx.title]) : "";
    const levelRaw = idx.level >= 0 ? cellToString(row[idx.level]) : "";
    const level = levelRaw || "L2";
    const department = idx.department >= 0 ? cellToString(row[idx.department]) : "";
    const managerName =
      idx.reportingManagerId >= 0 ? cellToString(row[idx.reportingManagerId]) : "";
    const employmentTypeRaw =
      idx.employmentType >= 0 ? cellToString(row[idx.employmentType]) : "";
    const projectRaw = idx.project >= 0 ? cellToString(row[idx.project]) : "";
    const skillRaw = idx.skill >= 0 ? cellToString(row[idx.skill]) : "";

    managerNames.push(managerName);
    result.push({
      employeeId,
      name,
      title,
      level,
      department,
      reportingManagerId: null,
      ...(employmentTypeRaw ? { employmentType: employmentTypeRaw } : {}),
      ...(projectRaw ? { project: projectRaw } : {}),
      ...(skillRaw ? { skill: skillRaw } : {}),
    });
  }

  const nameToId: Record<string, string> = {};
  for (const emp of result) {
    if (emp.name && !(emp.name in nameToId)) {
      nameToId[emp.name] = emp.employeeId;
    }
  }

  for (let i = 0; i < result.length; i++) {
    const managerName = managerNames[i];
    if (managerName && managerName !== "0") {
      result[i].reportingManagerId = nameToId[managerName] ?? null;
    }
  }

  return result;
}
