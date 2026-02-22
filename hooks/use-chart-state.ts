"use client";

import { useState, useCallback } from "react";
import type { OrgTreeNode } from "@/lib/types/employee";
import { collectParentIds } from "@/lib/hierarchy/layout";

export function useChartState(tree: OrgTreeNode[]) {
  const [expandedNodes, setExpandedNodes] = useState<Set<string>>(new Set());

  const toggleNode = useCallback((nodeId: string) => {
    setExpandedNodes((prev) => {
      const next = new Set(prev);
      if (next.has(nodeId)) {
        next.delete(nodeId);
      } else {
        next.add(nodeId);
      }
      return next;
    });
  }, []);

  const expandAll = useCallback(() => {
    const allParents = collectParentIds(tree);
    setExpandedNodes(new Set(allParents));
  }, [tree]);

  const collapseAll = useCallback(() => {
    setExpandedNodes(new Set());
  }, []);

  return {
    expandedNodes,
    toggleNode,
    expandAll,
    collapseAll,
  };
}
