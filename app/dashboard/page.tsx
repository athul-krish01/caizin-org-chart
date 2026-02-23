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
    tree,
    snapshot,
    tierGroups,
    departmentDistribution,
    filter,
    setFilter,
    isDemo,
  } = useOrgData();

  return (
    <div className="flex h-screen flex-col">
      <header className="flex items-center justify-between border-b border-neutral-200 dark:border-neutral-800 px-6 py-4">
        <div>
          <h1 className="text-lg font-bold text-neutral-900 dark:text-neutral-100">
            Caizin Org Chart
          </h1>
          <p className="text-xs text-neutral-500">
            Organizational Structure Explorer
          </p>
        </div>
        {isDemo && (
          <span className="rounded-full bg-amber-100 px-3 py-1 text-xs font-medium text-amber-700">
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
                <div className="space-y-6 p-6 max-w-7xl mx-auto">
                  <ExecutiveSnapshot snapshot={snapshot} />
                  <HierarchyExplorer
                    tierGroups={tierGroups}
                    allEmployees={allEmployees}
                  />
                  <DepartmentDistribution data={departmentDistribution} />
                </div>
              ),
            },
            {
              id: "org-chart",
              label: "Org Chart",
              content: (
                <div className="h-[calc(100vh-8rem)]">
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
