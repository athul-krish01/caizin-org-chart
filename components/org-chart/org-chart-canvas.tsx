"use client";

import { useMemo, useCallback } from "react";
import {
  ReactFlow,
  Background,
  BackgroundVariant,
  ReactFlowProvider,
  useReactFlow,
  type NodeTypes,
  type EdgeTypes,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";

import type { OrgTreeNode, EmploymentFilter } from "@/lib/types/employee";
import { computeFlowLayout } from "@/lib/hierarchy/layout";
import { OrgNode } from "./org-node";
import { OrgEdge } from "./org-edge";
import { ChartControls } from "./chart-controls";
import { ChartFilters } from "./chart-filters";

const nodeTypes: NodeTypes = { orgNode: OrgNode as unknown as NodeTypes[string] };
const edgeTypes: EdgeTypes = { smoothstep: OrgEdge as unknown as EdgeTypes[string] };

interface OrgChartCanvasProps {
  tree: OrgTreeNode[];
  filter: EmploymentFilter;
  onFilterChange: (filter: EmploymentFilter) => void;
}

function OrgChartInner({ tree, filter, onFilterChange }: OrgChartCanvasProps) {
  const { fitView } = useReactFlow();

  const { nodes, edges } = useMemo(
    () => computeFlowLayout(tree),
    [tree]
  );

  const allNodeIds = useMemo(
    () => nodes.map((n) => n.id),
    [nodes]
  );

  const handleExpandAll = useCallback(() => {
    // In Phase 2, this will integrate with expand/collapse state.
    // For now, all nodes are shown.
    setTimeout(() => fitView({ padding: 0.2 }), 50);
  }, [fitView]);

  const handleCollapseAll = useCallback(() => {
    setTimeout(() => fitView({ padding: 0.2 }), 50);
  }, [fitView]);

  return (
    <div className="relative h-full w-full">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        nodeTypes={nodeTypes}
        edgeTypes={edgeTypes}
        fitView
        fitViewOptions={{ padding: 0.2 }}
        minZoom={0.1}
        maxZoom={2}
        proOptions={{ hideAttribution: true }}
        nodesDraggable={false}
        nodesConnectable={false}
        elementsSelectable={false}
      >
        <Background variant={BackgroundVariant.Dots} gap={20} size={1} />
      </ReactFlow>

      <div className="absolute top-4 left-4 flex flex-col gap-2 z-10">
        <ChartFilters active={filter} onChange={onFilterChange} />
      </div>

      <div className="absolute bottom-4 right-4 z-10">
        <ChartControls
          onExpandAll={handleExpandAll}
          onCollapseAll={handleCollapseAll}
        />
      </div>
    </div>
  );
}

export function OrgChartCanvas(props: OrgChartCanvasProps) {
  return (
    <ReactFlowProvider>
      <OrgChartInner {...props} />
    </ReactFlowProvider>
  );
}
