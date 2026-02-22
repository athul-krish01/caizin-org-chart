import type { Employee } from "@/lib/types/employee";
import { Avatar } from "@/components/shared/avatar";

interface EmployeeCardProps {
  employee: Employee;
  managerName?: string;
}

function formatEmploymentType(type: Employee["employmentType"]): string | null {
  if (type === "internal" || type === "caizin") return "Internal";
  if (type === "contractor") return "Contractor";
  return null;
}

export function EmployeeCard({ employee, managerName }: EmployeeCardProps) {
  const empType = formatEmploymentType(employee.employmentType);

  return (
    <div className="flex items-start gap-3 rounded-lg border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950 p-4">
      <Avatar name={employee.name} />
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2">
          <p className="text-sm font-semibold text-neutral-900 dark:text-neutral-100 truncate">
            {employee.name}
          </p>
          <span className="shrink-0 rounded-md bg-neutral-100 dark:bg-neutral-800 px-2 py-0.5 text-xs font-medium text-neutral-600 dark:text-neutral-400">
            {employee.level}
          </span>
        </div>
        <p className="text-xs text-neutral-500 dark:text-neutral-400 truncate">
          {employee.title}
        </p>
        <div className="mt-2 grid grid-cols-2 gap-x-4 gap-y-1 text-xs text-neutral-500 dark:text-neutral-400">
          <span>{employee.department}</span>
          {empType && <span>{empType}</span>}
          {employee.project && <span>{employee.project}</span>}
          {managerName && <span>Reports to: {managerName}</span>}
        </div>
      </div>
    </div>
  );
}
