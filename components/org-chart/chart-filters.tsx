"use client";

import type { EmploymentFilter } from "@/lib/types/employee";
import { cn } from "@/lib/utils";

interface ChartFiltersProps {
  active: EmploymentFilter;
  onChange: (filter: EmploymentFilter) => void;
  className?: string;
}

const FILTERS: { value: EmploymentFilter; label: string }[] = [
  { value: "all", label: "All" },
  { value: "internal", label: "Internal (Caizin)" },
  { value: "contractor", label: "Contractor" },
];

export function ChartFilters({ active, onChange, className }: ChartFiltersProps) {
  return (
    <div
      className={cn(
        "flex items-center gap-0.5 rounded-[10px] border border-border bg-card p-1 shadow-[0_1px_3px_rgba(0,0,0,0.04)]",
        className
      )}
    >
      {FILTERS.map((f) => (
        <button
          key={f.value}
          onClick={() => onChange(f.value)}
          className={cn(
            "rounded-md px-3.5 py-1.5 text-[12px] font-medium transition-all",
            active === f.value
              ? "bg-blue-600 text-white shadow-[0_1px_2px_rgba(37,99,235,0.3)]"
              : "text-muted-foreground hover:bg-secondary hover:text-foreground"
          )}
        >
          {f.label}
        </button>
      ))}
    </div>
  );
}
