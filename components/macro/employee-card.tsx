import type { Employee } from "@/lib/types/employee";
import { Avatar } from "@/components/shared/avatar";
import { cn } from "@/lib/utils";

interface EmployeeCardProps {
  employee: Employee;
  managerName?: string;
}

function formatEmploymentType(type: Employee["employmentType"]): {
  label: string;
  className: string;
} | null {
  if (type === "internal" || type === "caizin")
    return { label: "Internal", className: "bg-teal-50 text-teal-700" };
  if (type === "contractor")
    return { label: "Contractor", className: "bg-orange-50 text-orange-700" };
  return null;
}

export function EmployeeCard({ employee, managerName }: EmployeeCardProps) {
  const empType = formatEmploymentType(employee.employmentType);

  return (
    <div className="flex items-start gap-3 rounded-[10px] border border-border bg-card p-4 shadow-[0_1px_3px_rgba(0,0,0,0.04)] transition-shadow hover:shadow-[0_4px_12px_rgba(0,0,0,0.07)]">
      <Avatar name={employee.name} className="h-9 w-9 text-xs" />
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2">
          <p className="truncate text-[13px] font-semibold text-foreground">
            {employee.name}
          </p>
          <span className="shrink-0 rounded-full bg-blue-50 px-2 py-0.5 text-[11px] font-medium text-blue-700">
            {employee.level}
          </span>
        </div>
        <p className="truncate text-xs text-muted-foreground">
          {employee.title}
        </p>
        <div className="mt-1.5 flex flex-wrap items-center gap-1.5">
          {empType && (
            <span className={cn("inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[11px] font-medium", empType.className)}>
              <span className={cn("h-1.5 w-1.5 rounded-full", empType.className === "bg-teal-50 text-teal-700" ? "bg-teal-500" : "bg-orange-500")} />
              {empType.label}
            </span>
          )}
          {managerName && (
            <span className="text-[11px] text-muted-foreground">
              &rarr; {managerName}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
