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
        "flex items-center gap-1 rounded-lg border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950 p-1 shadow-sm",
        className
      )}
    >
      {FILTERS.map((f) => (
        <button
          key={f.value}
          onClick={() => onChange(f.value)}
          className={cn(
            "rounded-md px-3 py-1.5 text-xs font-medium transition-colors",
            active === f.value
              ? "bg-neutral-900 dark:bg-neutral-100 text-white dark:text-neutral-900"
              : "text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-800"
          )}
        >
          {f.label}
        </button>
      ))}
    </div>
  );
}
