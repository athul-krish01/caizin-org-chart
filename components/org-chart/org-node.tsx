"use client";

import { memo } from "react";
import { Handle, Position, type NodeProps } from "@xyflow/react";
import type { Employee } from "@/lib/types/employee";
import { Avatar } from "@/components/shared/avatar";
import { cn } from "@/lib/utils";

export interface OrgNodeData {
  employee: Employee;
  directReports: number;
  depth: number;
}

function OrgNodeComponent({ data }: NodeProps) {
  const { employee, directReports } = data as unknown as OrgNodeData;

  return (
    <div className="relative w-[240px] rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950 shadow-sm">
      <Handle type="target" position={Position.Top} className="!bg-neutral-400 !w-2 !h-2" />

      <div className="p-4">
        <div className="flex items-start gap-3">
          <Avatar name={employee.name} className="h-9 w-9 text-xs" />
          <div className="min-w-0 flex-1">
            <p className="text-sm font-semibold text-neutral-900 dark:text-neutral-100 truncate leading-tight">
              {employee.name}
            </p>
            <p className="text-xs text-neutral-500 truncate">
              {employee.title}
            </p>
          </div>
          <span className="shrink-0 rounded-full bg-neutral-100 dark:bg-neutral-800 px-1.5 py-0.5 text-[10px] font-medium text-neutral-500">
            {employee.level}
          </span>
        </div>

        <div className="mt-3 flex flex-wrap gap-x-3 gap-y-1 text-[11px] text-neutral-500">
          <span>{employee.department}</span>
          {employee.project && <span>{employee.project}</span>}
        </div>

        {employee.employmentType !== "unknown" &&
          employee.employmentType !== "internal" && (
            <span
              className={cn(
                "mt-2 inline-block rounded-full px-2 py-0.5 text-[10px] font-medium",
                employee.employmentType === "contractor"
                  ? "bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400"
                  : "bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400"
              )}
            >
              {employee.employmentType}
            </span>
          )}
      </div>

      {directReports > 0 && (
        <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 rounded-full bg-neutral-900 dark:bg-neutral-100 px-2 py-0.5 text-[10px] font-medium text-white dark:text-neutral-900 z-10">
          {directReports}
        </div>
      )}

      <Handle type="source" position={Position.Bottom} className="!bg-neutral-400 !w-2 !h-2" />
    </div>
  );
}

export const OrgNode = memo(OrgNodeComponent);
