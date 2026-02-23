import { cn } from "@/lib/utils";

interface StatsCardProps {
  label: string;
  value: number | string;
  icon?: React.ReactNode;
  iconClassName?: string;
  className?: string;
}

export function StatsCard({ label, value, icon, iconClassName, className }: StatsCardProps) {
  return (
    <div
      className={cn(
        "flex items-center gap-4 rounded-[10px] border border-border",
        "bg-card p-5 shadow-[0_1px_3px_rgba(0,0,0,0.04)]",
        className
      )}
    >
      {icon && (
        <div className={cn("flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-secondary text-muted-foreground", iconClassName)}>
          {icon}
        </div>
      )}
      <div>
        <p className="text-[28px] font-bold tracking-tight text-foreground">
          {value}
        </p>
        <p className="text-xs font-medium text-muted-foreground">
          {label}
        </p>
      </div>
    </div>
  );
}
