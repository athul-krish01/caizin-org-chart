import type { OrgTreeNode } from "@/lib/types/employee";

export interface FlowNode {
  id: string;
  type: "orgNode";
  position: { x: number; y: number };
  data: {
    employee: OrgTreeNode["employee"];
    directReports: number;
    depth: number;
    isExpanded: boolean;
    hasChildren: boolean;
    managerName: string | null;
  };
}

export interface FlowEdge {
  id: string;
  source: string;
  target: string;
  type: "smoothstep";
}

const NODE_WIDTH = 280;
const NODE_HEIGHT = 185;
const HORIZONTAL_GAP = 40;
const VERTICAL_GAP = 70;

/**
 * Converts the logical OrgTree into React Flow nodes and edges,
 * respecting which nodes are expanded. Only children of expanded
 * nodes are rendered.
 */
export function computeFlowLayout(
  roots: OrgTreeNode[],
  expandedNodes: Set<string>,
  employeeMap: Map<string, string>
): { nodes: FlowNode[]; edges: FlowEdge[] } {
  const nodes: FlowNode[] = [];
  const edges: FlowEdge[] = [];

  let xOffset = 0;

  for (const root of roots) {
    const width = layoutSubtree(root, xOffset, 0, nodes, edges, expandedNodes, employeeMap);
    xOffset += width + HORIZONTAL_GAP;
  }

  return { nodes, edges };
}

function getVisibleSubtreeWidth(
  node: OrgTreeNode,
  expandedNodes: Set<string>
): number {
  const isExpanded = expandedNodes.has(node.employee.employeeId);

  if (!isExpanded || node.children.length === 0) {
    return NODE_WIDTH;
  }

  const childrenWidth = node.children.reduce(
    (sum, child) =>
      sum + getVisibleSubtreeWidth(child, expandedNodes) + HORIZONTAL_GAP,
    -HORIZONTAL_GAP
  );

  return Math.max(NODE_WIDTH, childrenWidth);
}

function layoutSubtree(
  node: OrgTreeNode,
  x: number,
  y: number,
  nodes: FlowNode[],
  edges: FlowEdge[],
  expandedNodes: Set<string>,
  employeeMap: Map<string, string>
): number {
  const isExpanded = expandedNodes.has(node.employee.employeeId);
  const subtreeWidth = getVisibleSubtreeWidth(node, expandedNodes);
  const nodeX = x + subtreeWidth / 2 - NODE_WIDTH / 2;

  const managerId = node.employee.reportingManagerId;
  const managerName = managerId ? employeeMap.get(managerId) ?? null : null;

  nodes.push({
    id: node.employee.employeeId,
    type: "orgNode",
    position: { x: nodeX, y },
    data: {
      employee: node.employee,
      directReports: node.children.length,
      depth: node.depth,
      isExpanded,
      hasChildren: node.children.length > 0,
      managerName,
    },
  });

  if (isExpanded && node.children.length > 0) {
    let childX = x;
    const childY = y + NODE_HEIGHT + VERTICAL_GAP;

    for (const child of node.children) {
      const childWidth = layoutSubtree(
        child,
        childX,
        childY,
        nodes,
        edges,
        expandedNodes,
        employeeMap
      );

      edges.push({
        id: `${node.employee.employeeId}-${child.employee.employeeId}`,
        source: node.employee.employeeId,
        target: child.employee.employeeId,
        type: "smoothstep",
      });

      childX += childWidth + HORIZONTAL_GAP;
    }
  }

  return subtreeWidth;
}

/**
 * Collect all node IDs that have children (for expand-all).
 */
export function collectParentIds(roots: OrgTreeNode[]): string[] {
  const ids: string[] = [];
  function walk(node: OrgTreeNode) {
    if (node.children.length > 0) {
      ids.push(node.employee.employeeId);
      node.children.forEach(walk);
    }
  }
  roots.forEach(walk);
  return ids;
}
