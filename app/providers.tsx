"use client";

import { OrgDataProvider } from "@/contexts/org-data-context";

export function Providers({ children }: { children: React.ReactNode }) {
  return <OrgDataProvider>{children}</OrgDataProvider>;
}
