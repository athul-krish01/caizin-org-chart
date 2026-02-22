"use client";

import { useMemo } from "react";
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
    <div className="rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950">
      <div className="border-b border-neutral-200 dark:border-neutral-800 px-5 py-4">
        <h3 className="text-sm font-semibold text-neutral-900 dark:text-neutral-100">
          Organizational Structure
        </h3>
        <p className="mt-0.5 text-xs text-neutral-500">
          Corporate Tier → Department → Employee
        </p>
      </div>
      <div className="p-3">
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
