import * as XLSX from "xlsx";
import type { RawEmployeeRow } from "@/lib/types/employee";

function cellToString(value: unknown): string {
  if (value === null || value === undefined) return "";
  return String(value).trim();
}

function normalizeColName(raw: string): string {
  return raw.toLowerCase().replace(/[\s_-]/g, "");
}

const FIELD_HEADERS: Record<keyof Omit<RawEmployeeRow, "skills">, string> = {
  employeeId: "employeeid",
  name: "name",
  title: "title",
  level: "level",
  department: "department",
  reportingManagerId: "reportingmanagerid",
  employmentType: "employmenttype",
  project: "project",
};

const FALLBACK_INDICES: Record<string, number> = {
  employeeid: 0,
  name: 1,
  title: 2,
  level: 3,
  department: 4,
  reportingmanagerid: 5,
  employmenttype: 6,
  project: 7,
};

function resolveColumnIndices(headerRow: unknown[]) {
  const headerMap = new Map<string, number>();
  for (let j = 0; j < headerRow.length; j++) {
    const normalized = normalizeColName(cellToString(headerRow[j]));
    if (normalized) headerMap.set(normalized, j);
  }

  const resolve = (field: string): number =>
    headerMap.get(field) ?? FALLBACK_INDICES[field] ?? -1;

  return {
    employeeId: resolve(FIELD_HEADERS.employeeId),
    name: resolve(FIELD_HEADERS.name),
    title: resolve(FIELD_HEADERS.title),
    level: resolve(FIELD_HEADERS.level),
    department: resolve(FIELD_HEADERS.department),
    reportingManagerId: resolve(FIELD_HEADERS.reportingManagerId),
    employmentType: resolve(FIELD_HEADERS.employmentType),
    project: resolve(FIELD_HEADERS.project),
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

  if (idx.name === -1) {
    throw new Error(
      "Could not find a 'name' column. Headers found: " +
        (rows[0] as unknown[]).map(cellToString).join(", ")
    );
  }

  const dataRows = rows.slice(1);
  const result: RawEmployeeRow[] = [];

  for (let i = 0; i < dataRows.length; i++) {
    const row = dataRows[i] as unknown[];

    const employeeId = cellToString(row[idx.employeeId]) || `ROW_${i + 2}`;
    const name = cellToString(row[idx.name]);
    const title = cellToString(row[idx.title]);
    const level = cellToString(row[idx.level]);
    const department = cellToString(row[idx.department]);
    const reportingManagerIdRaw = cellToString(row[idx.reportingManagerId]);
    const employmentTypeRaw = cellToString(row[idx.employmentType]);
    const projectRaw = cellToString(row[idx.project]);

    if (!name) continue;

    const reportingManagerId =
      reportingManagerIdRaw === "" || reportingManagerIdRaw === "0"
        ? null
        : reportingManagerIdRaw;

    result.push({
      employeeId,
      name,
      title,
      level,
      department,
      reportingManagerId,
      ...(employmentTypeRaw ? { employmentType: employmentTypeRaw } : {}),
      ...(projectRaw ? { project: projectRaw } : {}),
    });
  }

  return result;
}
