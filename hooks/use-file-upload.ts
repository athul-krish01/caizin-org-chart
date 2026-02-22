"use client";

import { useState, useCallback } from "react";

interface UploadState {
  file: File | null;
  status: "idle" | "loading" | "success" | "error";
  error: string | null;
}

export function useFileUpload(
  onFileLoaded: (file: File) => void
) {
  const [state, setState] = useState<UploadState>({
    file: null,
    status: "idle",
    error: null,
  });

  const handleFile = useCallback(
    (file: File) => {
      const validTypes = [
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        "application/vnd.ms-excel",
        "text/csv",
      ];

      if (!validTypes.includes(file.type) && !file.name.match(/\.(xlsx|xls|csv)$/i)) {
        setState({
          file: null,
          status: "error",
          error: "Invalid file type. Please upload an Excel (.xlsx, .xls) or CSV file.",
        });
        return;
      }

      setState({ file, status: "loading", error: null });

      try {
        onFileLoaded(file);
        setState({ file, status: "success", error: null });
      } catch (err) {
        setState({
          file,
          status: "error",
          error: err instanceof Error ? err.message : "Failed to process file.",
        });
      }
    },
    [onFileLoaded]
  );

  const reset = useCallback(() => {
    setState({ file: null, status: "idle", error: null });
  }, []);

  return {
    ...state,
    handleFile,
    reset,
  };
}
