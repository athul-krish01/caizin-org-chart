"use client";

import { useState } from "react";
import { ChevronRight, FolderOpen } from "lucide-react";
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
    <div className="ml-7">
      <button
        onClick={() => setExpanded(!expanded)}
        className="flex w-full items-center gap-2.5 rounded-md px-2 py-2 text-left transition-colors hover:bg-secondary/60"
      >
        <ChevronRight
          className={cn(
            "h-3 w-3 shrink-0 text-muted-foreground transition-transform duration-200",
            expanded && "rotate-90"
          )}
        />
        <FolderOpen className="h-3.5 w-3.5 shrink-0 text-muted-foreground" />
        <span className="text-[13px] font-medium text-foreground">
          {group.department}
        </span>
        <span className="rounded-full bg-secondary px-1.5 py-0.5 text-[11px] font-medium text-muted-foreground">
          {group.count}
        </span>
      </button>

      {expanded && (
        <div className="ml-5 grid gap-2 pb-3 pt-1 sm:grid-cols-2 lg:grid-cols-3">
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
