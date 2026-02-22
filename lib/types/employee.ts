export interface RawEmployeeRow {
  employeeId: string;
  name: string;
  title: string;
  department: string;
  level: string;
  reportingManagerId: string | null;
  employmentType?: string;
  project?: string;
  skills?: string;
}

export type CorporateTier =
  | "Executive"
  | "Senior Leadership"
  | "Leadership"
  | "Senior Professional"
  | "Professional Contributor";

export const CORPORATE_TIER_ORDER: CorporateTier[] = [
  "Executive",
  "Senior Leadership",
  "Leadership",
  "Senior Professional",
  "Professional Contributor",
];

export interface Employee {
  employeeId: string;
  name: string;
  title: string;
  department: string;
  level: string;
  corporateTier: CorporateTier;
  reportingManagerId: string | null;
  employmentType: "internal" | "contractor" | "caizin" | "unknown";
  project: string | null;
  skills: string[];
}

export interface OrgTreeNode {
  employee: Employee;
  children: OrgTreeNode[];
  depth: number;
}

export interface TierGroup {
  tier: CorporateTier;
  count: number;
  departments: DepartmentGroup[];
}

export interface DepartmentGroup {
  department: string;
  count: number;
  employees: Employee[];
}

export interface OrgSnapshot {
  totalHeadcount: number;
  totalDepartments: number;
  contractorCount: number;
  internalCount: number;
}

export interface DepartmentDistribution {
  department: string;
  count: number;
  internalCount: number;
  contractorCount: number;
}

export type EmploymentFilter = "all" | "internal" | "contractor" | "caizin";

export interface ValidationError {
  type: "missing_column" | "duplicate_id" | "circular_reference" | "invalid_row";
  message: string;
  details?: string;
}

export interface ValidationResult {
  valid: boolean;
  errors: ValidationError[];
  warnings: string[];
}
