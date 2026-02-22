"use client";

import { useState } from "react";
import { ChevronRight } from "lucide-react";
import type { TierGroup as TierGroupType } from "@/lib/types/employee";
import { DepartmentGroup } from "./department-group";
import { cn } from "@/lib/utils";

interface TierGroupProps {
  group: TierGroupType;
  managerMap: Map<string, string>;
}

export function TierGroup({ group, managerMap }: TierGroupProps) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="border-b border-neutral-100 dark:border-neutral-800 last:border-b-0">
      <button
        onClick={() => setExpanded(!expanded)}
        className="flex w-full items-center gap-3 py-3 px-2 text-left hover:bg-neutral-50 dark:hover:bg-neutral-900 transition-colors rounded-lg"
      >
        <ChevronRight
          className={cn(
            "h-4 w-4 shrink-0 text-neutral-400 transition-transform",
            expanded && "rotate-90"
          )}
        />
        <span className="text-sm font-semibold text-neutral-900 dark:text-neutral-100">
          {group.tier}
        </span>
        <span className="rounded-md bg-neutral-100 dark:bg-neutral-800 px-2 py-0.5 text-xs font-medium text-neutral-600 dark:text-neutral-400">
          {group.count}
        </span>
      </button>

      {expanded && (
        <div className="pb-2">
          {group.departments.map((dept) => (
            <DepartmentGroup
              key={dept.department}
              group={dept}
              managerMap={managerMap}
            />
          ))}
        </div>
      )}
    </div>
  );
}
