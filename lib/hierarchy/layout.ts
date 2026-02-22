import type { OrgTreeNode } from "@/lib/types/employee";

export interface FlowNode {
  id: string;
  type: "orgNode";
  position: { x: number; y: number };
  data: {
    employee: OrgTreeNode["employee"];
    directReports: number;
    depth: number;
  };
}

export interface FlowEdge {
  id: string;
  source: string;
  target: string;
  type: "smoothstep";
}

const NODE_WIDTH = 260;
const NODE_HEIGHT = 160;
const HORIZONTAL_GAP = 40;
const VERTICAL_GAP = 80;

/**
 * Converts the logical OrgTree into React Flow nodes and edges
 * with calculated positions. Uses a recursive width-based layout
 * that centers parents above their children.
 */
export function computeFlowLayout(
  roots: OrgTreeNode[]
): { nodes: FlowNode[]; edges: FlowEdge[] } {
  const nodes: FlowNode[] = [];
  const edges: FlowEdge[] = [];

  let xOffset = 0;

  for (const root of roots) {
    const width = layoutSubtree(root, xOffset, 0, nodes, edges);
    xOffset += width + HORIZONTAL_GAP;
  }

  return { nodes, edges };
}

function getSubtreeWidth(node: OrgTreeNode): number {
  if (node.children.length === 0) {
    return NODE_WIDTH;
  }

  const childrenWidth = node.children.reduce(
    (sum, child) => sum + getSubtreeWidth(child) + HORIZONTAL_GAP,
    -HORIZONTAL_GAP
  );

  return Math.max(NODE_WIDTH, childrenWidth);
}

function layoutSubtree(
  node: OrgTreeNode,
  x: number,
  y: number,
  nodes: FlowNode[],
  edges: FlowEdge[]
): number {
  const subtreeWidth = getSubtreeWidth(node);
  const nodeX = x + subtreeWidth / 2 - NODE_WIDTH / 2;

  nodes.push({
    id: node.employee.employeeId,
    type: "orgNode",
    position: { x: nodeX, y },
    data: {
      employee: node.employee,
      directReports: node.children.length,
      depth: node.depth,
    },
  });

  if (node.children.length > 0) {
    let childX = x;
    const childY = y + NODE_HEIGHT + VERTICAL_GAP;

    for (const child of node.children) {
      const childWidth = layoutSubtree(child, childX, childY, nodes, edges);

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
