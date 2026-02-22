import type {
  Employee,
  TierGroup,
  DepartmentGroup,
  OrgSnapshot,
  DepartmentDistribution,
  CorporateTier,
} from "@/lib/types/employee";
import { CORPORATE_TIER_ORDER } from "@/lib/types/employee";

export function computeSnapshot(employees: Employee[]): OrgSnapshot {
  const departments = new Set(employees.map((e) => e.department));

  return {
    totalHeadcount: employees.length,
    totalDepartments: departments.size,
    contractorCount: employees.filter((e) => e.employmentType === "contractor")
      .length,
    internalCount: employees.filter(
      (e) => e.employmentType === "internal" || e.employmentType === "caizin"
    ).length,
  };
}

export function groupByTier(employees: Employee[]): TierGroup[] {
  const tierMap = new Map<CorporateTier, Employee[]>();

  for (const emp of employees) {
    const existing = tierMap.get(emp.corporateTier) || [];
    existing.push(emp);
    tierMap.set(emp.corporateTier, existing);
  }

  return CORPORATE_TIER_ORDER
    .filter((tier) => tierMap.has(tier))
    .map((tier) => {
      const emps = tierMap.get(tier)!;
      return {
        tier,
        count: emps.length,
        departments: groupByDepartment(emps),
      };
    });
}

export function groupByDepartment(employees: Employee[]): DepartmentGroup[] {
  const deptMap = new Map<string, Employee[]>();

  for (const emp of employees) {
    const existing = deptMap.get(emp.department) || [];
    existing.push(emp);
    deptMap.set(emp.department, existing);
  }

  return [...deptMap.entries()]
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([department, emps]) => ({
      department,
      count: emps.length,
      employees: emps,
    }));
}

export function computeDepartmentDistribution(
  employees: Employee[]
): DepartmentDistribution[] {
  const deptMap = new Map<
    string,
    { total: number; internal: number; contractor: number }
  >();

  for (const emp of employees) {
    const entry = deptMap.get(emp.department) || {
      total: 0,
      internal: 0,
      contractor: 0,
    };
    entry.total++;
    if (emp.employmentType === "contractor") {
      entry.contractor++;
    } else {
      entry.internal++;
    }
    deptMap.set(emp.department, entry);
  }

  return [...deptMap.entries()]
    .sort(([, a], [, b]) => b.total - a.total)
    .map(([department, counts]) => ({
      department,
      count: counts.total,
      internalCount: counts.internal,
      contractorCount: counts.contractor,
    }));
}
