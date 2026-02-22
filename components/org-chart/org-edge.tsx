"use client";

import { memo } from "react";
import {
  SmoothStepEdge,
  type EdgeProps,
} from "@xyflow/react";

function OrgEdgeComponent(props: EdgeProps) {
  return (
    <SmoothStepEdge
      {...props}
      style={{
        stroke: "var(--color-neutral-300)",
        strokeWidth: 1.5,
      }}
      pathOptions={{ borderRadius: 12 }}
    />
  );
}

export const OrgEdge = memo(OrgEdgeComponent);
