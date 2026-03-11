"use client";

import { Handle, Position, type NodeProps } from "@xyflow/react";
import type { Employee } from "@/lib/types/employee";
import { Avatar } from "@/components/shared/avatar";
import { Building2, ChevronDown, ChevronRight, FolderKanban, GitBranch, Users, Zap } from "lucide-react";
import { cn } from "@/lib/utils";
import { getDeptBorderL } from "@/lib/constants/department-colors";

export interface OrgNodeData {
  employee: Employee;
  directReports: number;
  depth: number;
  isExpanded: boolean;
  hasChildren: boolean;
  managerName: string | null;
  onToggle?: (nodeId: string) => void;
}

function getBadge(type: Employee["employmentType"]) {
  if (type === "contractor")
    return { label: "Contractor", dot: "bg-orange-500", cls: "bg-orange-50 text-orange-700" };
  return { label: "Internal", dot: "bg-teal-500", cls: "bg-teal-50 text-teal-700" };
}

export function OrgNode({ data }: NodeProps) {
  const { employee, directReports, isExpanded, hasChildren, managerName, onToggle } =
    data as unknown as OrgNodeData;

  const leftBorder = getDeptBorderL(employee.department);
  const badge = getBadge(employee.employmentType);

  return (
    <div className={cn("relative w-[270px]", hasChildren && "cursor-pointer")}>
      <Handle
        type="target"
        position={Position.Top}
        className="!h-1.5 !w-1.5 !border-0 !bg-border"
      />

      <div
        className={cn(
          "overflow-hidden rounded-[10px] border border-border bg-card",
          "border-l-[3px] shadow-[0_1px_3px_rgba(0,0,0,0.04)]",
          hasChildren &&
            "transition-shadow duration-200 hover:shadow-[0_4px_12px_rgba(0,0,0,0.07)]",
          leftBorder
        )}
      >
        {/* Header: avatar + identity + level */}
        <div className="flex items-start gap-3 px-4 pb-3 pt-4">
          <Avatar name={employee.name} className="h-10 w-10 text-xs shrink-0" />

          <div className="min-w-0 flex-1">
            <p className="truncate text-[13px] font-semibold leading-tight text-foreground">
              {employee.name}
            </p>
            <p className="mt-0.5 truncate text-[11px] leading-snug text-muted-foreground">
              {employee.title}
            </p>
          </div>

          <span className="shrink-0 rounded-full bg-blue-50 px-2 py-0.5 text-[10px] font-semibold text-blue-700">
            {employee.level}
          </span>
        </div>

        {/* Metadata */}
        <div className="mx-4 border-t border-border/60" />

        <div className="space-y-2 px-4 py-3">
          <MetaRow icon={<Building2 className="h-3 w-3" />} value={employee.department} />
          {employee.project && <MetaRow icon={<FolderKanban className="h-3 w-3" />} value={employee.project} />}
          {employee.skill && (
            <MetaRow
              icon={<Zap className="h-3 w-3 text-violet-600" />}
              value={employee.skill}
              badge
            />
          )}
          {managerName && <MetaRow icon={<GitBranch className="h-3 w-3" />} value={managerName} />}
        </div>

        {/* Footer */}
        <div className="mx-4 border-t border-border/60" />

        <div className="flex items-center justify-between px-4 py-2.5">
          <span
            className={cn(
              "inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-medium",
              badge.cls
            )}
          >
            <span className={cn("h-1.5 w-1.5 rounded-full", badge.dot)} />
            {badge.label}
          </span>

          {directReports > 0 && (
            <span className="flex items-center gap-1 text-[11px] font-medium text-muted-foreground">
              <Users className="h-3 w-3" />
              {directReports}
            </span>
          )}
        </div>
      </div>

      {hasChildren && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            onToggle?.(employee.employeeId);
          }}
          className={cn(
            "absolute -bottom-4 left-1/2 z-10 -translate-x-1/2",
            "flex items-center gap-1 rounded-full",
            "border border-border bg-card",
            "px-2.5 py-1 text-[10px] font-medium text-muted-foreground",
            "shadow-[0_1px_3px_rgba(0,0,0,0.04)]",
            "cursor-pointer transition-all duration-200",
            "hover:border-blue-300 hover:bg-blue-50 hover:text-blue-700"
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
        className="!h-1.5 !w-1.5 !border-0 !bg-border"
      />
    </div>
  );
}

function MetaRow({
  icon,
  value,
  badge,
}: {
  icon: React.ReactNode;
  value: string;
  badge?: boolean;
}) {
  return (
    <div className="flex items-center gap-2 min-w-0">
      <span className="shrink-0 text-muted-foreground">
        {icon}
      </span>
      {badge ? (
        <span className="inline-flex items-center rounded-md bg-violet-50 px-2 py-0.5 text-[11px] font-medium text-violet-700">
          {value}
        </span>
      ) : (
        <span className="truncate text-[11px] text-foreground/80">
          {value}
        </span>
      )}
    </div>
  );
}
