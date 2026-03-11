"use client";

import { useOrgData } from "@/hooks/use-org-data";
import { TabShell } from "@/components/shared/tab-shell";
import { ExecutiveSnapshot } from "@/components/macro/executive-snapshot";
import { HierarchyExplorer } from "@/components/macro/hierarchy-explorer";
import { DepartmentDistribution } from "@/components/macro/department-distribution";
import { OrgChartCanvas } from "@/components/org-chart/org-chart-canvas";

export default function DashboardPage() {
  const {
    allEmployees,
    employees,
    tree,
    snapshot,
    tierGroups,
    departmentDistribution,
    filter,
    setFilter,
    isDemo,
  } = useOrgData();

  return (
    <div className="flex h-screen flex-col bg-background">
      <header className="flex items-center justify-between border-b border-border bg-card px-8 py-4">
        <div>
          <h1 className="text-[22px] font-semibold leading-tight tracking-tight text-foreground">
            Caizin Org Chart
          </h1>
          <p className="mt-0.5 text-[13px] text-muted-foreground">
            Organizational Structure Explorer
          </p>
        </div>
        {isDemo && (
          <span className="inline-flex items-center gap-1.5 rounded-full bg-[#FFFBEB] px-3 py-1 text-xs font-medium text-amber-700">
            <span className="h-1.5 w-1.5 rounded-full bg-amber-500" />
            Demo data
          </span>
        )}
      </header>

      <div className="flex-1 overflow-hidden">
        <TabShell
          tabs={[
            {
              id: "overview",
              label: "Overview",
              content: (
                <div className="mx-auto max-w-7xl space-y-10 px-8 py-8">
                  <ExecutiveSnapshot snapshot={snapshot} />
                  <HierarchyExplorer
                    tierGroups={tierGroups}
                    allEmployees={allEmployees}
                  />
                  <DepartmentDistribution data={departmentDistribution} employees={employees} />
                </div>
              ),
            },
            {
              id: "org-chart",
              label: "Org Chart",
              content: (
                <div className="h-[calc(100vh-8rem)] border-t border-border/40 bg-background">
                  <OrgChartCanvas
                    tree={tree}
                    allEmployees={allEmployees}
                    filter={filter}
                    onFilterChange={setFilter}
                  />
                </div>
              ),
            },
          ]}
          defaultTab="overview"
        />
      </div>
    </div>
  );
}
