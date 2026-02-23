"use client";

import { useState } from "react";
import { ChevronRight, Shield, Star, Award, Zap, UserCircle } from "lucide-react";
import type { CorporateTier, TierGroup as TierGroupType } from "@/lib/types/employee";
import { DepartmentGroup } from "./department-group";
import { cn } from "@/lib/utils";

const TIER_CONFIG: Record<CorporateTier, { icon: React.ElementType; bg: string; text: string }> = {
  Executive:                { icon: Shield,     bg: "bg-blue-50",   text: "text-blue-600" },
  "Senior Leadership":      { icon: Star,       bg: "bg-violet-50", text: "text-violet-600" },
  Leadership:               { icon: Award,      bg: "bg-teal-50",   text: "text-teal-600" },
  "Senior Professional":    { icon: Zap,        bg: "bg-amber-50",  text: "text-amber-600" },
  "Professional Contributor": { icon: UserCircle, bg: "bg-rose-50",   text: "text-rose-500" },
};

interface TierGroupProps {
  group: TierGroupType;
  managerMap: Map<string, string>;
}

export function TierGroup({ group, managerMap }: TierGroupProps) {
  const [expanded, setExpanded] = useState(false);
  const config = TIER_CONFIG[group.tier] ?? TIER_CONFIG["Professional Contributor"];
  const Icon = config.icon;

  return (
    <div className="border-b border-border/60 last:border-b-0">
      <button
        onClick={() => setExpanded(!expanded)}
        className="flex w-full items-center gap-3 rounded-lg px-3 py-3 text-left transition-colors hover:bg-secondary/60"
      >
        <ChevronRight
          className={cn(
            "h-3.5 w-3.5 shrink-0 text-muted-foreground transition-transform duration-200",
            expanded && "rotate-90"
          )}
        />
        <div className={cn("flex h-7 w-7 items-center justify-center rounded-md", config.bg, config.text)}>
          <Icon className="h-3.5 w-3.5" />
        </div>
        <span className="text-[13px] font-semibold text-foreground">
          {group.tier}
        </span>
        <span className="rounded-full bg-secondary px-2 py-0.5 text-[11px] font-medium text-muted-foreground">
          {group.count}
        </span>
      </button>

      {expanded && (
        <div className="pb-2 pl-3">
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
