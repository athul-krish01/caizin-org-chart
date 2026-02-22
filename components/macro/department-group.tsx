"use client";

import { useState } from "react";
import { ChevronRight } from "lucide-react";
import type { DepartmentGroup as DepartmentGroupType } from "@/lib/types/employee";
import { EmployeeCard } from "./employee-card";
import { cn } from "@/lib/utils";

interface DepartmentGroupProps {
  group: DepartmentGroupType;
  managerMap: Map<string, string>;
}

export function DepartmentGroup({ group, managerMap }: DepartmentGroupProps) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="ml-6">
      <button
        onClick={() => setExpanded(!expanded)}
        className="flex items-center gap-2 py-2 text-sm text-neutral-700 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors"
      >
        <ChevronRight
          className={cn(
            "h-4 w-4 transition-transform",
            expanded && "rotate-90"
          )}
        />
        <span className="font-medium">{group.department}</span>
        <span className="text-neutral-400">({group.count})</span>
      </button>

      {expanded && (
        <div className="ml-6 grid gap-2 pb-2 sm:grid-cols-2 lg:grid-cols-3">
          {group.employees.map((emp) => (
            <EmployeeCard
              key={emp.employeeId}
              employee={emp}
              managerName={managerMap.get(emp.reportingManagerId ?? "")}
            />
          ))}
        </div>
      )}
    </div>
  );
}
