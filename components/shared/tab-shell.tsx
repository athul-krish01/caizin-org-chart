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
    <div className="flex flex-col h-full">
      <div className="flex border-b border-neutral-200 dark:border-neutral-800">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={cn(
              "px-6 py-3 text-sm font-medium transition-colors",
              "hover:text-neutral-900 dark:hover:text-neutral-100",
              activeTab === tab.id
                ? "border-b-2 border-neutral-900 dark:border-neutral-100 text-neutral-900 dark:text-neutral-100"
                : "text-neutral-500 dark:text-neutral-400"
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
