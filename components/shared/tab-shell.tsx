"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

interface Tab {
  id: string;
  label: string;
  content: React.ReactNode;
}

interface TabShellProps {
  tabs: Tab[];
  defaultTab?: string;
}

export function TabShell({ tabs, defaultTab }: TabShellProps) {
  const [activeTab, setActiveTab] = useState(defaultTab ?? tabs[0]?.id);

  const current = tabs.find((t) => t.id === activeTab);

  return (
    <div className="flex h-full flex-col">
      <div className="flex gap-1 border-b border-border bg-card px-6">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={cn(
              "relative px-4 py-3 text-[13px] font-medium transition-colors",
              "hover:text-foreground",
              activeTab === tab.id
                ? "text-foreground after:absolute after:inset-x-0 after:bottom-0 after:h-[2px] after:rounded-full after:bg-blue-600"
                : "text-muted-foreground"
            )}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div className="flex-1 overflow-auto">{current?.content}</div>
    </div>
  );
}
