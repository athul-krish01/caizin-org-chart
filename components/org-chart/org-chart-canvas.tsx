"use client";

import { useState, useMemo, useCallback, useEffect, useRef } from "react";
import {
  ReactFlow,
  Background,
  BackgroundVariant,
  ReactFlowProvider,
  useReactFlow,
  applyNodeChanges,
  applyEdgeChanges,
  type NodeTypes,
  type EdgeTypes,
  type NodeChange,
  type EdgeChange,
  type Node,
  type Edge,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";

import type { OrgTreeNode, EmploymentFilter } from "@/lib/types/employee";
import { computeFlowLayout } from "@/lib/hierarchy/layout";
import { useChartState } from "@/hooks/use-chart-state";
import { OrgNode, type OrgNodeData } from "./org-node";
import { OrgEdge } from "./org-edge";
import { ChartControls } from "./chart-controls";
import { ChartFilters } from "./chart-filters";

const nodeTypes: NodeTypes = {
  orgNode: OrgNode as unknown as NodeTypes[string],
};
const edgeTypes: EdgeTypes = {
  smoothstep: OrgEdge as unknown as EdgeTypes[string],
};

interface OrgChartCanvasProps {
  tree: OrgTreeNode[];
  allEmployees: { employeeId: string; name: string }[];
  filter: EmploymentFilter;
  onFilterChange: (filter: EmploymentFilter) => void;
}

function OrgChartInner({
  tree,
  allEmployees,
  filter,
  onFilterChange,
}: OrgChartCanvasProps) {
  const { fitView } = useReactFlow();
  const { expandedNodes, toggleNode, expandAll, collapseAll } =
    useChartState(tree);
  const prevNodeCountRef = useRef(0);

  const [rfNodes, setRfNodes] = useState<Node[]>([]);
  const [rfEdges, setRfEdges] = useState<Edge[]>([]);

  const employeeMap = useMemo(() => {
    const map = new Map<string, string>();
    for (const emp of allEmployees) {
      map.set(emp.employeeId, emp.name);
    }
    return map;
  }, [allEmployees]);

  useEffect(() => {
    const { nodes, edges } = computeFlowLayout(tree, expandedNodes, employeeMap);
    const withCallbacks = nodes.map((node) => ({
      ...node,
      data: { ...node.data, onToggle: toggleNode },
    }));
    setRfNodes(withCallbacks as Node[]);
    setRfEdges(edges as Edge[]);
  }, [tree, expandedNodes, employeeMap, toggleNode]);

  const handleNodeClick = useCallback(
    (_event: React.MouseEvent, node: Node) => {
      const nodeData = node.data as unknown as OrgNodeData;
      if (nodeData.hasChildren) {
        toggleNode(node.id);
      }
    },
    [toggleNode]
  );

  const onNodesChange = useCallback((changes: NodeChange[]) => {
    setRfNodes((nds) => applyNodeChanges(changes, nds));
  }, []);

  const onEdgesChange = useCallback((changes: EdgeChange[]) => {
    setRfEdges((eds) => applyEdgeChanges(changes, eds));
  }, []);

  useEffect(() => {
    const currentCount = rfNodes.length;
    if (currentCount !== prevNodeCountRef.current) {
      prevNodeCountRef.current = currentCount;
      const timer = setTimeout(() => fitView({ padding: 0.2 }), 60);
      return () => clearTimeout(timer);
    }
  }, [rfNodes.length, fitView]);

  const handleExpandAll = useCallback(() => {
    expandAll();
  }, [expandAll]);

  const handleCollapseAll = useCallback(() => {
    collapseAll();
  }, [collapseAll]);

  return (
    <div className="relative h-full w-full">
      <ReactFlow
        nodes={rfNodes}
        edges={rfEdges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onNodeClick={handleNodeClick}
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
