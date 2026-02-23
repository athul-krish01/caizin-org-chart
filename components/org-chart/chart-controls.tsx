"use client";

import { Maximize2, Minimize2, ZoomIn, ZoomOut, Scan, ChevronsDownUp, ChevronsUpDown } from "lucide-react";
import { useReactFlow } from "@xyflow/react";
import { cn } from "@/lib/utils";

interface ChartControlsProps {
  onExpandAll: () => void;
  onCollapseAll: () => void;
  className?: string;
}

export function ChartControls({
  onExpandAll,
  onCollapseAll,
  className,
}: ChartControlsProps) {
  const { zoomIn, zoomOut, fitView } = useReactFlow();

  return (
    <div
      className={cn(
        "flex items-center rounded-[10px] border border-border bg-card p-1 shadow-[0_1px_3px_rgba(0,0,0,0.04)]",
        className
      )}
    >
      <div className="flex items-center gap-0.5">
        <ControlButton onClick={() => zoomIn()} title="Zoom In" label="In">
          <ZoomIn className="h-3.5 w-3.5" />
        </ControlButton>
        <ControlButton onClick={() => zoomOut()} title="Zoom Out" label="Out">
          <ZoomOut className="h-3.5 w-3.5" />
        </ControlButton>
        <ControlButton onClick={() => fitView({ padding: 0.2 })} title="Fit View" label="Fit">
          <Scan className="h-3.5 w-3.5" />
        </ControlButton>
      </div>

      <div className="mx-1 h-5 w-px bg-border" />

      <div className="flex items-center gap-0.5">
        <ControlButton onClick={onExpandAll} title="Expand All" label="Expand">
          <ChevronsUpDown className="h-3.5 w-3.5" />
        </ControlButton>
        <ControlButton onClick={onCollapseAll} title="Collapse All" label="Collapse">
          <ChevronsDownUp className="h-3.5 w-3.5" />
        </ControlButton>
      </div>
    </div>
  );
}

function ControlButton({
  children,
  onClick,
  title,
  label,
}: {
  children: React.ReactNode;
  onClick: () => void;
  title: string;
  label: string;
}) {
  return (
    <button
      onClick={onClick}
      title={title}
      className="flex items-center gap-1 rounded-md px-2 py-1.5 text-muted-foreground transition-all hover:bg-secondary hover:text-foreground active:scale-95"
    >
      {children}
      <span className="text-[10px] font-medium">{label}</span>
    </button>
  );
}
