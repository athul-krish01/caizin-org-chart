"use client";

import { useState, useMemo } from "react";
import { X, Search } from "lucide-react";
import type { Employee } from "@/lib/types/employee";

interface DepartmentEmployeesModalProps {
  department: string;
  employees: Employee[];
  onClose: () => void;
}

function formatEmploymentType(type: Employee["employmentType"]): string {
  if (type === "internal" || type === "caizin") return "Internal";
  if (type === "contractor") return "Contractor";
  if (type === "caizin") return "Caizin";
  return "Unknown";
}

export function DepartmentEmployeesModal({
  department,
  employees,
  onClose,
}: DepartmentEmployeesModalProps) {
  const [search, setSearch] = useState("");

  const filtered = useMemo(() => {
    if (!search.trim()) return employees;
    const q = search.toLowerCase().trim();
    return employees.filter((e) =>
      e.name.toLowerCase().includes(q)
    );
  }, [employees, search]);

  const count = employees.length;
  const countLabel = count === 1 ? "1 Employee" : `${count} Employees`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="absolute inset-0 bg-black/40"
        onClick={onClose}
        aria-hidden="true"
      />
      <div className="relative z-10 flex max-h-[85vh] w-full max-w-3xl flex-col overflow-hidden rounded-xl border border-border bg-card shadow-xl">
        <div className="flex shrink-0 items-center justify-between border-b border-border px-5 py-4">
          <h2 className="text-lg font-semibold text-foreground">
            {department} — {countLabel}
          </h2>
          <button
            onClick={onClose}
            className="rounded-md p-1.5 text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
            aria-label="Close"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="shrink-0 border-b border-border px-5 py-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search by name..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded-lg border border-border bg-background py-2 pl-9 pr-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-violet-500 focus:outline-none focus:ring-1 focus:ring-violet-500"
            />
          </div>
        </div>

        <div className="min-h-0 flex-1 overflow-auto">
          {filtered.length > 0 ? (
            <table className="w-full text-left text-sm">
              <thead className="sticky top-0 z-10 bg-secondary/80 backdrop-blur-sm">
                <tr>
                  <th className="px-5 py-3 font-medium text-muted-foreground">
                    Employee Name
                  </th>
                  <th className="px-5 py-3 font-medium text-muted-foreground">
                    Title
                  </th>
                  <th className="px-5 py-3 font-medium text-muted-foreground">
                    Skill
                  </th>
                  <th className="px-5 py-3 font-medium text-muted-foreground">
                    Project
                  </th>
                  <th className="px-5 py-3 font-medium text-muted-foreground">
                    Employment Type
                  </th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((emp) => (
                  <tr
                    key={emp.employeeId}
                    className="border-t border-border/60 transition-colors hover:bg-secondary/40"
                  >
                    <td className="px-5 py-2.5 font-medium text-foreground">
                      {emp.name}
                    </td>
                    <td className="px-5 py-2.5 text-muted-foreground">
                      {emp.title}
                    </td>
                    <td className="px-5 py-2.5">
                      {emp.skill ? (
                        <span className="inline-flex rounded-full bg-violet-50 px-2 py-0.5 text-xs font-medium text-violet-700">
                          {emp.skill}
                        </span>
                      ) : (
                        <span className="text-muted-foreground">—</span>
                      )}
                    </td>
                    <td className="px-5 py-2.5 text-muted-foreground">
                      {emp.project || "—"}
                    </td>
                    <td className="px-5 py-2.5">
                      <span
                        className={
                          emp.employmentType === "contractor"
                            ? "text-orange-600"
                            : "text-muted-foreground"
                        }
                      >
                        {formatEmploymentType(emp.employmentType)}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div className="flex flex-col items-center justify-center py-12 text-muted-foreground">
              <p className="text-sm">
                {search.trim()
                  ? "No employees match your search."
                  : "No employees in this department."}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
