"use client";

import { useState, useCallback } from "react";

export function useChartState() {
  const [expandedNodes, setExpandedNodes] = useState<Set<string>>(
    new Set()
  );
  const [focusedNodeId, setFocusedNodeId] = useState<string | null>(null);

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

  const expandAll = useCallback((allNodeIds: string[]) => {
    setExpandedNodes(new Set(allNodeIds));
  }, []);

  const collapseAll = useCallback(() => {
    setExpandedNodes(new Set());
  }, []);

  const isExpanded = useCallback(
    (nodeId: string) => expandedNodes.has(nodeId),
    [expandedNodes]
  );

  const focusNode = useCallback((nodeId: string | null) => {
    setFocusedNodeId(nodeId);
  }, []);

  return {
    expandedNodes,
    focusedNodeId,
    toggleNode,
    expandAll,
    collapseAll,
    isExpanded,
    focusNode,
  };
}
