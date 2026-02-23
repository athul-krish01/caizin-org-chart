import type { Employee, RawEmployeeRow, CorporateTier } from "@/lib/types/employee";

const LEVEL_TO_TIER: Record<string, CorporateTier> = {
  L0: "Executive",
  L1: "Executive",
  L2: "Senior Leadership",
  L3: "Leadership",
  L4: "Senior Professional",
  L5: "Senior Professional",
  "L5.1": "Senior Professional",
  L6: "Professional Contributor",
  L7: "Professional Contributor",
  L8: "Professional Contributor",
};

function deriveCorporateTier(level: string): CorporateTier {
  return LEVEL_TO_TIER[level.trim()] ?? "Professional Contributor";
}

function parseEmploymentType(
  raw?: string
): Employee["employmentType"] {
  if (!raw) return "unknown";
  const lower = raw.toLowerCase().trim();
  if (lower === "internal") return "internal";
  if (lower === "contractor") return "contractor";
  if (lower === "caizin") return "caizin";
  return "unknown";
}

function parseSkills(raw?: string): string[] {
  if (!raw || raw.trim() === "") return [];
  return raw
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
}

export function normalizeRow(row: RawEmployeeRow): Employee {
  const level = row.level.trim();
  return {
    employeeId: row.employeeId.trim(),
    name: row.name.trim(),
    title: row.title.trim(),
    department: row.department?.trim() || "Unassigned",
    level,
    corporateTier: deriveCorporateTier(level),
    reportingManagerId:
      row.reportingManagerId && row.reportingManagerId.trim() !== ""
        ? row.reportingManagerId.trim()
        : null,
    employmentType: parseEmploymentType(row.employmentType),
    project: row.project?.trim() || null,
    skills: parseSkills(row.skills),
  };
}

export function normalizeDataset(rows: RawEmployeeRow[]): Employee[] {
  return rows.map(normalizeRow);
}
