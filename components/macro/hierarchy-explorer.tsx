"use client";

import { useMemo } from "react";
import { Network } from "lucide-react";
import type { Employee, TierGroup as TierGroupType } from "@/lib/types/employee";
import { TierGroup } from "./level-group";

interface HierarchyExplorerProps {
  tierGroups: TierGroupType[];
  allEmployees: Employee[];
}

export function HierarchyExplorer({
  tierGroups,
  allEmployees,
}: HierarchyExplorerProps) {
  const managerMap = useMemo(() => {
    const map = new Map<string, string>();
    for (const emp of allEmployees) {
      map.set(emp.employeeId, emp.name);
    }
    return map;
  }, [allEmployees]);

  return (
    <div className="rounded-[10px] border border-border bg-card shadow-[0_1px_3px_rgba(0,0,0,0.04)]">
      <div className="flex items-center gap-3 border-b border-border px-5 py-4">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
          <Network className="h-4 w-4" />
        </div>
        <div>
          <h3 className="text-sm font-semibold text-foreground">
            Organizational Structure
          </h3>
          <p className="text-xs text-muted-foreground">
            Corporate Tier &rarr; Department &rarr; Employee
          </p>
        </div>
      </div>
      <div className="p-2">
        {tierGroups.map((group) => (
          <TierGroup
            key={group.tier}
            group={group}
            managerMap={managerMap}
          />
        ))}
      </div>
    </div>
  );
}
