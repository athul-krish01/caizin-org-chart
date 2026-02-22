import { cn } from "@/lib/utils";

interface StatsCardProps {
  label: string;
  value: number | string;
  icon?: React.ReactNode;
  className?: string;
}

export function StatsCard({ label, value, icon, className }: StatsCardProps) {
  return (
    <div
      className={cn(
        "flex items-center gap-4 rounded-xl border border-neutral-200 dark:border-neutral-800",
        "bg-white dark:bg-neutral-950 p-5",
        className
      )}
    >
      {icon && (
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400">
          {icon}
        </div>
      )}
      <div>
        <p className="text-2xl font-bold tracking-tight text-neutral-900 dark:text-neutral-100">
          {value}
        </p>
        <p className="text-sm text-neutral-500 dark:text-neutral-400">
          {label}
        </p>
      </div>
    </div>
  );
}
