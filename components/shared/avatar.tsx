import { cn } from "@/lib/utils";

interface AvatarProps {
  name: string;
  className?: string;
}

function getInitials(name: string): string {
  const parts = name.trim().split(/\s+/);
  if (parts.length >= 2) {
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  }
  return (parts[0]?.[0] ?? "?").toUpperCase();
}

const COLORS = [
  "bg-blue-500",
  "bg-emerald-500",
  "bg-violet-500",
  "bg-amber-500",
  "bg-rose-500",
  "bg-cyan-500",
  "bg-indigo-500",
  "bg-teal-500",
];

function getColorFromName(name: string): string {
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  return COLORS[Math.abs(hash) % COLORS.length];
}

export function Avatar({ name, className }: AvatarProps) {
  const initials = getInitials(name);
  const color = getColorFromName(name);

  return (
    <div
      className={cn(
        "flex items-center justify-center rounded-full text-white font-semibold text-sm",
        "h-10 w-10 shrink-0",
        color,
        className
      )}
      title={name}
    >
      {initials}
    </div>
  );
}
