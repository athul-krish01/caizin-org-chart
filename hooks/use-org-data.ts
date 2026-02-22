"use client";

import { useState, useMemo, useCallback } from "react";
import type {
  Employee,
  RawEmployeeRow,
  OrgTreeNode,
  TierGroup,
  OrgSnapshot,
  DepartmentDistribution,
  EmploymentFilter,
  ValidationResult,
} from "@/lib/types/employee";
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

interface OrgDataState {
  employees: Employee[];
  validation: ValidationResult | null;
  loaded: boolean;
}

export function useOrgData() {
  const [state, setState] = useState<OrgDataState>({
    employees: [],
    validation: null,
    loaded: false,
  });

  const [filter, setFilter] = useState<EmploymentFilter>("all");

  const loadData = useCallback((rawRows: RawEmployeeRow[]) => {
    const validation = validateData(rawRows);
    const employees = normalizeDataset(rawRows);
    setState({ employees, validation, loaded: true });
  }, []);

  const filteredEmployees = useMemo(() => {
    const filtered = filterByEmploymentType(state.employees, filter);
    return recalculateRoots(filtered);
  }, [state.employees, filter]);

  const tree: OrgTreeNode[] = useMemo(
    () => buildOrgTree(filteredEmployees),
    [filteredEmployees]
  );

  const snapshot: OrgSnapshot = useMemo(
    () => computeSnapshot(state.employees),
    [state.employees]
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
    allEmployees: state.employees,
    tree,
    snapshot,
    tierGroups,
    departmentDistribution,
    validation: state.validation,
    loaded: state.loaded,
    filter,
    setFilter,
    loadData,
  };
}
