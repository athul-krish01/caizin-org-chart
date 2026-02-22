import type { Employee, EmploymentFilter } from "@/lib/types/employee";

export function filterByEmploymentType(
  employees: Employee[],
  filter: EmploymentFilter
): Employee[] {
  if (filter === "all") return employees;
  if (filter === "internal") {
    return employees.filter(
      (e) => e.employmentType === "internal" || e.employmentType === "caizin"
    );
  }
  return employees.filter((e) => e.employmentType === filter);
}

/**
 * After filtering, some employees may reference managers that were removed.
 * This recalculates roots: any employee whose manager is not in the
 * filtered set becomes a root (reportingManagerId set to null in the copy).
 */
export function recalculateRoots(filtered: Employee[]): Employee[] {
  const idSet = new Set(filtered.map((e) => e.employeeId));

  return filtered.map((emp) => {
    if (emp.reportingManagerId && !idSet.has(emp.reportingManagerId)) {
      return { ...emp, reportingManagerId: null };
    }
    return emp;
  });
}
