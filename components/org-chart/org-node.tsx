"use client";

import { Handle, Position, type NodeProps } from "@xyflow/react";
import type { Employee } from "@/lib/types/employee";
import { Avatar } from "@/components/shared/avatar";
import { ChevronDown, ChevronRight, Users } from "lucide-react";
import { cn } from "@/lib/utils";

export interface OrgNodeData {
  employee: Employee;
  directReports: number;
  depth: number;
  isExpanded: boolean;
  hasChildren: boolean;
  managerName: string | null;
  onToggle?: (nodeId: string) => void;
}

const DEPT_BORDER: Record<string, string> = {
  Engineering: "border-l-blue-500",
  Finance: "border-l-emerald-500",
  "Human Resources": "border-l-violet-500",
  Operations: "border-l-teal-500",
  Management: "border-l-indigo-500",
  Product: "border-l-rose-500",
  Data: "border-l-cyan-500",
  Executive: "border-l-slate-400",
  Marketing: "border-l-pink-500",
  Sales: "border-l-orange-400",
  Legal: "border-l-violet-400",
};

function getDeptBorder(dept: string): string {
  return DEPT_BORDER[dept] ?? "border-l-neutral-300";
}

function getBadgeStyle(type: Employee["employmentType"]) {
  if (type === "contractor")
    return "bg-amber-50 text-amber-700 ring-1 ring-amber-200";
  if (type === "caizin")
    return "bg-violet-50 text-violet-700 ring-1 ring-violet-200";
  return "bg-indigo-50 text-indigo-700 ring-1 ring-indigo-200";
}

function getBadgeLabel(type: Employee["employmentType"]): string {
  if (type === "contractor") return "Contractor";
  if (type === "caizin") return "Caizin";
  return "Employee";
}

export function OrgNode({ data }: NodeProps) {
  const { employee, directReports, isExpanded, hasChildren, managerName, onToggle } =
    data as unknown as OrgNodeData;

  const isContractor = employee.employmentType === "contractor";
  const leftBorder = isContractor
    ? "border-l-amber-400"
    : getDeptBorder(employee.department);

  return (
    <div className={cn("relative w-[260px]", hasChildren && "cursor-pointer")}>
      <Handle
        type="target"
        position={Position.Top}
        className="!w-1.5 !h-1.5 !bg-neutral-300 !border-0"
      />

      <div
        className={cn(
          "rounded-xl border border-neutral-200 bg-white overflow-hidden",
          "border-l-[3px] shadow-[0_1px_3px_rgba(0,0,0,0.06),0_1px_2px_rgba(0,0,0,0.04)]",
          hasChildren &&
            "hover:shadow-[0_3px_10px_rgba(0,0,0,0.08)] transition-shadow duration-150",
          leftBorder
        )}
      >
        {/* Identity row */}
        <div className="flex items-center gap-3 px-3.5 pt-3.5 pb-2.5">
          <Avatar name={employee.name} className="h-9 w-9 text-[11px] shrink-0" />

          <div className="min-w-0 flex-1">
            <p className="text-[13px] font-semibold leading-tight text-neutral-900 truncate">
              {employee.name}
            </p>
            <p className="text-[11px] leading-snug text-neutral-400 mt-0.5 truncate">
              {employee.title}
            </p>
          </div>

          {/* Level badge — top right, no chevron here */}
          <span className="shrink-0 rounded bg-neutral-100 px-1.5 py-0.5 text-[10px] font-semibold text-neutral-500 tracking-wide">
            {employee.level}
          </span>
        </div>

        {/* Divider */}
        <div className="mx-3.5 border-t border-neutral-100" />

        {/* Details section */}
        <div className="px-3.5 py-2.5 space-y-1.5">
          <div className="flex items-center gap-2 min-w-0">
            <span className="shrink-0 w-[72px] text-[10px] font-medium text-neutral-400 uppercase tracking-wide">
              Dept
            </span>
            <span className="text-[11px] text-neutral-600 truncate">
              {employee.department}
            </span>
          </div>

          {employee.project && (
            <div className="flex items-center gap-2 min-w-0">
              <span className="shrink-0 w-[72px] text-[10px] font-medium text-neutral-400 uppercase tracking-wide">
                Project
              </span>
              <span className="text-[11px] text-neutral-600 truncate">
                {employee.project}
              </span>
            </div>
          )}

          {managerName && (
            <div className="flex items-center gap-2 min-w-0">
              <span className="shrink-0 w-[72px] text-[10px] font-medium text-neutral-400 uppercase tracking-wide">
                Reports to
              </span>
              <span className="text-[11px] text-neutral-600 truncate">
                {managerName}
              </span>
            </div>
          )}
        </div>

        {/* Divider */}
        <div className="mx-3.5 border-t border-neutral-100" />

        {/* Footer: employment badge + direct reports count */}
        <div className="flex items-center justify-between px-3.5 py-2.5">
          <span
            className={cn(
              "inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-medium",
              getBadgeStyle(employee.employmentType)
            )}
          >
            {getBadgeLabel(employee.employmentType)}
          </span>

          {directReports > 0 && (
            <span className="flex items-center gap-1 text-[11px] font-medium text-neutral-400">
              <Users className="h-3 w-3" />
              {directReports}
            </span>
          )}
        </div>
      </div>

      {/* Bottom expand/collapse pill — only on nodes with children */}
      {hasChildren && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            onToggle?.(employee.employeeId);
          }}
          className={cn(
            "absolute -bottom-4 left-1/2 -translate-x-1/2 z-10",
            "flex items-center gap-1 rounded-full",
            "border border-neutral-200 bg-white shadow-sm",
            "px-2.5 py-1 text-[10px] font-medium text-neutral-500",
            "hover:bg-neutral-50 hover:text-neutral-800 transition-colors cursor-pointer"
          )}
        >
          {isExpanded ? (
            <ChevronDown className="h-3 w-3" />
          ) : (
            <ChevronRight className="h-3 w-3" />
          )}
          <span>{directReports}</span>
        </button>
      )}

      <Handle
        type="source"
        position={Position.Bottom}
        className="!w-1.5 !h-1.5 !bg-neutral-300 !border-0"
      />
    </div>
  );
}
