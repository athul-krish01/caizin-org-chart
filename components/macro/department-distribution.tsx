"use client";

import { useState } from "react";
import { BarChart3 } from "lucide-react";
import type { DepartmentDistribution as DistType, Employee } from "@/lib/types/employee";
import { getDeptColor } from "@/lib/constants/department-colors";
import { DepartmentEmployeesModal } from "./department-employees-modal";

interface WorkforceCompositionProps {
  data: DistType[];
  employees: Employee[];
}

export function DepartmentDistribution({ data, employees }: WorkforceCompositionProps) {
  const [selectedDepartment, setSelectedDepartment] = useState<string | null>(null);

  const departmentEmployees = selectedDepartment
    ? employees.filter((e) => e.department === selectedDepartment)
    : [];
  const maxCount = Math.max(...data.map((d) => d.count), 1);
  const totalPeople = data.reduce((s, d) => s + d.count, 0);

  return (
    <div className="rounded-[10px] border border-border bg-card shadow-[0_1px_3px_rgba(0,0,0,0.04)]">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-border px-5 py-4">
        <div className="flex items-center gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-violet-50 text-violet-600">
            <BarChart3 className="h-4 w-4" />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-foreground">
              Workforce Composition
            </h3>
            <p className="text-xs text-muted-foreground">
              {data.length} departments &middot; {totalPeople} people
            </p>
          </div>
        </div>
      </div>

      {/* Department grid */}
      <div className="grid gap-3 p-4 sm:grid-cols-2 lg:grid-cols-3">
        {data.map((item, i) => {
          const c = getDeptColor(item.department);
          const pct = Math.round((item.count / totalPeople) * 100);
          const internalPct = item.count > 0 ? Math.round((item.internalCount / item.count) * 100) : 0;

          return (
            <button
              key={item.department}
              type="button"
              onClick={() => setSelectedDepartment(item.department)}
              className={`relative w-full overflow-hidden rounded-lg border ${c.border} bg-card p-4 text-left transition-shadow hover:shadow-[0_4px_12px_rgba(0,0,0,0.06)]`}
            >
              {/* Accent bar */}
              <div
                className="absolute inset-y-0 left-0 w-1 rounded-l-lg"
                style={{ backgroundColor: c.solid }}
              />

              {/* Top: name + total */}
              <div className="flex items-start justify-between pl-2">
                <div className="min-w-0">
                  <p className={`truncate text-[13px] font-semibold ${c.text}`}>
                    {item.department}
                  </p>
                  <p className="mt-0.5 text-[11px] text-muted-foreground">
                    {pct}% of org
                  </p>
                </div>
                <span className="text-xl font-bold tabular-nums text-foreground">
                  {item.count}
                </span>
              </div>

              {/* Bar */}
              <div className="mt-3 flex h-2 w-full overflow-hidden rounded-full bg-secondary pl-2">
                <div
                  className="h-full rounded-full transition-all duration-500"
                  style={{
                    width: `${(item.internalCount / maxCount) * 100}%`,
                    backgroundColor: c.solid,
                  }}
                />
                {item.contractorCount > 0 && (
                  <div
                    className="ml-0.5 h-full rounded-full bg-orange-300 transition-all duration-500"
                    style={{
                      width: `${(item.contractorCount / maxCount) * 100}%`,
                    }}
                  />
                )}
              </div>

              {/* Bottom: breakdown */}
              <div className="mt-2.5 flex items-center gap-3 pl-2 text-[11px]">
                <span className="flex items-center gap-1 text-muted-foreground">
                  <span
                    className="inline-block h-1.5 w-1.5 rounded-full"
                    style={{ backgroundColor: c.solid }}
                  />
                  {item.internalCount} internal
                  <span className="ml-0.5 text-muted-foreground/60">({internalPct}%)</span>
                </span>
                {item.contractorCount > 0 && (
                  <span className="flex items-center gap-1 text-muted-foreground">
                    <span className="inline-block h-1.5 w-1.5 rounded-full bg-orange-500" />
                    {item.contractorCount} contractor{item.contractorCount !== 1 ? "s" : ""}
                  </span>
                )}
              </div>
            </button>
          );
        })}
      </div>

      {selectedDepartment && (
        <DepartmentEmployeesModal
          department={selectedDepartment}
          employees={departmentEmployees}
          onClose={() => setSelectedDepartment(null)}
        />
      )}
    </div>
  );
}
