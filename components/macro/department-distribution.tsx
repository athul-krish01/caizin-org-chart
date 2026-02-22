import type { DepartmentDistribution as DistType } from "@/lib/types/employee";

interface WorkforceCompositionProps {
  data: DistType[];
}

export function DepartmentDistribution({ data }: WorkforceCompositionProps) {
  const maxCount = Math.max(...data.map((d) => d.count), 1);

  return (
    <div className="rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950">
      <div className="border-b border-neutral-200 dark:border-neutral-800 px-5 py-4">
        <h3 className="text-sm font-semibold text-neutral-900 dark:text-neutral-100">
          Workforce Composition
        </h3>
      </div>
      <div className="p-5 space-y-4">
        {data.map((item) => (
          <div key={item.department} className="space-y-1.5">
            <div className="flex items-baseline justify-between text-sm">
              <div className="flex items-baseline gap-2">
                <span className="font-medium text-neutral-900 dark:text-neutral-100">
                  {item.department}
                </span>
                <span className="text-xs text-neutral-500">
                  {item.internalCount} Internal{item.contractorCount > 0 && `, ${item.contractorCount} Contractor${item.contractorCount !== 1 ? "s" : ""}`}
                </span>
              </div>
              <span className="font-semibold text-neutral-900 dark:text-neutral-100 tabular-nums">
                {item.count}
              </span>
            </div>
            <div className="flex h-2 w-full overflow-hidden rounded-full bg-neutral-100 dark:bg-neutral-800">
              <div
                className="h-2 bg-neutral-800 dark:bg-neutral-200 transition-all"
                style={{
                  width: `${(item.internalCount / maxCount) * 100}%`,
                }}
              />
              {item.contractorCount > 0 && (
                <div
                  className="h-2 bg-neutral-400 dark:bg-neutral-500 transition-all"
                  style={{
                    width: `${(item.contractorCount / maxCount) * 100}%`,
                  }}
                />
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
