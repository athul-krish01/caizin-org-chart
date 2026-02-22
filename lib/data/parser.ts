import type { RawEmployeeRow } from "@/lib/types/employee";

/**
 * Phase 2 stub — will parse an uploaded Excel file into raw rows.
 * For MVP Phase 1, use dummy-data.ts directly instead.
 */
export async function parseExcelFile(
  _file: File
): Promise<RawEmployeeRow[]> {
  // TODO: Phase 2 — integrate xlsx or exceljs library
  // 1. Read file as ArrayBuffer
  // 2. Parse workbook, take first sheet
  // 3. Map header row to RawEmployeeRow keys
  // 4. Return typed row array
  throw new Error(
    "Excel parsing is not yet implemented. Use dummy data for Phase 1."
  );
}
