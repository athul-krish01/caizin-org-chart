"use client";

import { useState, useMemo } from "react";
import type {
  OrgTreeNode,
  TierGroup,
  OrgSnapshot,
  DepartmentDistribution,
  EmploymentFilter,
} from "@/lib/types/employee";
import { useOrgDataContext } from "@/contexts/org-data-context";
import { dummyEmployeeData } from "@/lib/data/dummy-data";
import { validateData } from "@/lib/data/validator";
import { normalizeDataset } from "@/lib/data/normalizer";
import { buildOrgTree } from "@/lib/hierarchy/tree-builder";
import {
  computeSnapshot,
  groupByTier,
  computeDepartmentDistribution,
} from "@/lib/hierarchy/grouping";
import {
  filterByEmploymentType,
  recalculateRoots,
} from "@/lib/hierarchy/filters";

export function useOrgData() {
  const { rawRows } = useOrgDataContext();
  const [filter, setFilter] = useState<EmploymentFilter>("all");

  // If context has uploaded rows use them; otherwise fall back to demo data.
  const sourceRows = rawRows ?? dummyEmployeeData;
  const isDemo = rawRows === null;

  const validation = useMemo(() => validateData(sourceRows), [sourceRows]);

  const allEmployees = useMemo(
    () => normalizeDataset(sourceRows),
    [sourceRows]
  );

  const filteredEmployees = useMemo(() => {
    const filtered = filterByEmploymentType(allEmployees, filter);
    return recalculateRoots(filtered);
  }, [allEmployees, filter]);

  const tree: OrgTreeNode[] = useMemo(
    () => buildOrgTree(filteredEmployees),
    [filteredEmployees]
  );

  const snapshot: OrgSnapshot = useMemo(
    () => computeSnapshot(allEmployees),
    [allEmployees]
  );

  const tierGroups: TierGroup[] = useMemo(
    () => groupByTier(filteredEmployees),
    [filteredEmployees]
  );

  const departmentDistribution: DepartmentDistribution[] = useMemo(
    () => computeDepartmentDistribution(filteredEmployees),
    [filteredEmployees]
  );

  return {
    employees: filteredEmployees,
    allEmployees,
    tree,
    snapshot,
    tierGroups,
    departmentDistribution,
    validation,
    isDemo,
    filter,
    setFilter,
  };
}
