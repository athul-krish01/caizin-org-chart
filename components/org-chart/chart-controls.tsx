"use client";

import { Maximize2, Minimize2, ZoomIn, ZoomOut } from "lucide-react";
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
        "flex items-center gap-1 rounded-lg border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950 p-1 shadow-sm",
        className
      )}
    >
      <ControlButton onClick={() => zoomIn()} title="Zoom In">
        <ZoomIn className="h-4 w-4" />
      </ControlButton>
      <ControlButton onClick={() => zoomOut()} title="Zoom Out">
        <ZoomOut className="h-4 w-4" />
      </ControlButton>
      <ControlButton onClick={() => fitView({ padding: 0.2 })} title="Fit View">
        <Maximize2 className="h-4 w-4" />
      </ControlButton>
      <div className="mx-1 h-5 w-px bg-neutral-200 dark:bg-neutral-700" />
      <ControlButton onClick={onExpandAll} title="Expand All">
        <Maximize2 className="h-3.5 w-3.5" />
        <span className="text-[10px]">All</span>
      </ControlButton>
      <ControlButton onClick={onCollapseAll} title="Collapse All">
        <Minimize2 className="h-3.5 w-3.5" />
        <span className="text-[10px]">All</span>
      </ControlButton>
    </div>
  );
}

function ControlButton({
  children,
  onClick,
  title,
}: {
  children: React.ReactNode;
  onClick: () => void;
  title: string;
}) {
  return (
    <button
      onClick={onClick}
      title={title}
      className="flex items-center gap-1 rounded-md px-2 py-1.5 text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
    >
      {children}
    </button>
  );
}
