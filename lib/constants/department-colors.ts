export interface DeptColor {
  solid: string;
  light: string;
  border: string;
  wash: string;
  text: string;
}

const DEPT_MAP: Record<string, DeptColor> = {
  Engineering:        { solid: "#3b82f6", light: "#bfdbfe", border: "border-blue-200",    wash: "bg-blue-50",    text: "text-blue-700" },
  Data:               { solid: "#06b6d4", light: "#a5f3fc", border: "border-cyan-200",    wash: "bg-cyan-50",    text: "text-cyan-700" },
  Legal:              { solid: "#0ea5e9", light: "#bae6fd", border: "border-sky-200",     wash: "bg-sky-50",     text: "text-sky-700" },
  Management:         { solid: "#14b8a6", light: "#99f6e4", border: "border-teal-200",    wash: "bg-teal-50",    text: "text-teal-700" },
  Finance:            { solid: "#10b981", light: "#a7f3d0", border: "border-emerald-200", wash: "bg-emerald-50", text: "text-emerald-700" },
  Recruitment:        { solid: "#22c55e", light: "#86efac", border: "border-green-200",   wash: "bg-green-50",   text: "text-green-700" },
  DevOps:             { solid: "#84cc16", light: "#bef264", border: "border-lime-200",    wash: "bg-lime-50",    text: "text-lime-700" },
  Delivery:           { solid: "#eab308", light: "#fde047", border: "border-yellow-200",  wash: "bg-yellow-50",  text: "text-yellow-700" },
  Product:            { solid: "#f59e0b", light: "#fde68a", border: "border-amber-200",   wash: "bg-amber-50",   text: "text-amber-700" },
  Executive:          { solid: "#f97316", light: "#fed7aa", border: "border-orange-200",  wash: "bg-orange-50",  text: "text-orange-700" },
  IT:                 { solid: "#ef4444", light: "#fca5a5", border: "border-red-200",     wash: "bg-red-50",     text: "text-red-700" },
  Operations:         { solid: "#f43f5e", light: "#fecdd3", border: "border-rose-200",    wash: "bg-rose-50",    text: "text-rose-700" },
  Sales:              { solid: "#ec4899", light: "#fbcfe8", border: "border-pink-200",    wash: "bg-pink-50",    text: "text-pink-700" },
  Marketing:          { solid: "#d946ef", light: "#f0abfc", border: "border-fuchsia-200", wash: "bg-fuchsia-50", text: "text-fuchsia-700" },
  Design:             { solid: "#a855f7", light: "#d8b4fe", border: "border-purple-200",  wash: "bg-purple-50",  text: "text-purple-700" },
  "Human Resources":  { solid: "#8b5cf6", light: "#c4b5fd", border: "border-violet-200",  wash: "bg-violet-50",  text: "text-violet-700" },
  QA:                 { solid: "#6366f1", light: "#c7d2fe", border: "border-indigo-200",  wash: "bg-indigo-50",  text: "text-indigo-700" },
  Admin:              { solid: "#64748b", light: "#cbd5e1", border: "border-slate-200",   wash: "bg-slate-50",   text: "text-slate-700" },
};

const FALLBACK_PALETTE: DeptColor[] = Object.values(DEPT_MAP);

function hashString(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  return Math.abs(hash);
}

export function getDeptColor(department: string): DeptColor {
  return DEPT_MAP[department] ?? FALLBACK_PALETTE[hashString(department) % FALLBACK_PALETTE.length];
}

const BORDER_L_MAP: Record<string, string> = {
  Engineering:       "border-l-blue-500",
  Data:              "border-l-cyan-500",
  Legal:             "border-l-sky-500",
  Management:        "border-l-teal-500",
  Finance:           "border-l-emerald-500",
  Recruitment:       "border-l-green-500",
  DevOps:            "border-l-lime-500",
  Delivery:          "border-l-yellow-500",
  Product:           "border-l-amber-500",
  Executive:         "border-l-orange-500",
  IT:                "border-l-red-500",
  Operations:        "border-l-rose-500",
  Sales:             "border-l-pink-500",
  Marketing:         "border-l-fuchsia-500",
  Design:            "border-l-purple-500",
  "Human Resources": "border-l-violet-500",
  QA:                "border-l-indigo-500",
  Admin:             "border-l-slate-500",
};

const FALLBACK_BORDERS = Object.values(BORDER_L_MAP);

export function getDeptBorderL(department: string): string {
  return BORDER_L_MAP[department] ?? FALLBACK_BORDERS[hashString(department) % FALLBACK_BORDERS.length];
}
