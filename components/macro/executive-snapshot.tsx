import { Users, UserCheck, Briefcase, Building2 } from "lucide-react";
import type { OrgSnapshot } from "@/lib/types/employee";
import { StatsCard } from "@/components/shared/stats-card";

interface ExecutiveSnapshotProps {
  snapshot: OrgSnapshot;
}

export function ExecutiveSnapshot({ snapshot }: ExecutiveSnapshotProps) {
  return (
    <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
      <StatsCard
        label="Total People"
        value={snapshot.totalHeadcount}
        icon={<Users className="h-5 w-5" />}
      />
      <StatsCard
        label="Caizin Employees"
        value={snapshot.internalCount}
        icon={<UserCheck className="h-5 w-5" />}
      />
      <StatsCard
        label="Contractors"
        value={snapshot.contractorCount}
        icon={<Briefcase className="h-5 w-5" />}
      />
      <StatsCard
        label="Total Departments"
        value={snapshot.totalDepartments}
        icon={<Building2 className="h-5 w-5" />}
      />
    </div>
  );
}
