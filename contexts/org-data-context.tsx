"use client";

import {
  createContext,
  useContext,
  useState,
  useCallback,
  type ReactNode,
} from "react";
import type { RawEmployeeRow } from "@/lib/types/employee";

interface OrgDataContextValue {
  /** Rows from an uploaded file. null means no upload yet → use demo data. */
  rawRows: RawEmployeeRow[] | null;
  setRawRows: (rows: RawEmployeeRow[]) => void;
  clearData: () => void;
}

const OrgDataContext = createContext<OrgDataContextValue | null>(null);

export function OrgDataProvider({ children }: { children: ReactNode }) {
  const [rawRows, setRawRowsState] = useState<RawEmployeeRow[] | null>(null);

  const setRawRows = useCallback((rows: RawEmployeeRow[]) => {
    setRawRowsState(rows);
  }, []);

  const clearData = useCallback(() => {
    setRawRowsState(null);
  }, []);

  return (
    <OrgDataContext.Provider value={{ rawRows, setRawRows, clearData }}>
      {children}
    </OrgDataContext.Provider>
  );
}

export function useOrgDataContext(): OrgDataContextValue {
  const ctx = useContext(OrgDataContext);
  if (!ctx) {
    throw new Error("useOrgDataContext must be used within <OrgDataProvider>");
  }
  return ctx;
}
