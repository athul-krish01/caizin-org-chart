import type { Employee, OrgTreeNode } from "@/lib/types/employee";

export function buildOrgTree(employees: Employee[]): OrgTreeNode[] {
  const employeeMap = new Map<string, Employee>();
  const childrenMap = new Map<string, Employee[]>();

  for (const emp of employees) {
    employeeMap.set(emp.employeeId, emp);
  }

  for (const emp of employees) {
    const managerId = emp.reportingManagerId;
    if (managerId && employeeMap.has(managerId)) {
      const existing = childrenMap.get(managerId) || [];
      existing.push(emp);
      childrenMap.set(managerId, existing);
    }
  }

  const roots = employees.filter(
    (emp) =>
      !emp.reportingManagerId ||
      !employeeMap.has(emp.reportingManagerId)
  );

  function buildNode(employee: Employee, depth: number): OrgTreeNode {
    const children = childrenMap.get(employee.employeeId) || [];
    return {
      employee,
      depth,
      children: children.map((child) => buildNode(child, depth + 1)),
    };
  }

  return roots.map((root) => buildNode(root, 0));
}

export function flattenTree(nodes: OrgTreeNode[]): OrgTreeNode[] {
  const result: OrgTreeNode[] = [];
  function walk(node: OrgTreeNode) {
    result.push(node);
    node.children.forEach(walk);
  }
  nodes.forEach(walk);
  return result;
}

export function findNode(
  nodes: OrgTreeNode[],
  employeeId: string
): OrgTreeNode | null {
  for (const node of nodes) {
    if (node.employee.employeeId === employeeId) return node;
    const found = findNode(node.children, employeeId);
    if (found) return found;
  }
  return null;
}

export function getDirectReportsCount(
  nodes: OrgTreeNode[],
  employeeId: string
): number {
  const node = findNode(nodes, employeeId);
  return node ? node.children.length : 0;
}
