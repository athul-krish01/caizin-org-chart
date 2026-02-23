"use client";

import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";
import { UploadZone } from "@/components/upload/upload-zone";
import { UploadStatus } from "@/components/upload/upload-status";
import { parseExcelFile } from "@/lib/data/parser";
import { useOrgDataContext } from "@/contexts/org-data-context";

export default function Home() {
  const router = useRouter();
  const { setRawRows } = useOrgDataContext();

  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [error, setError] = useState<string | null>(null);

  const handleFile = useCallback(
    async (file: File) => {
      setStatus("loading");
      setError(null);
      try {
        const rows = await parseExcelFile(file);
        setRawRows(rows);
        setStatus("success");
        router.push("/dashboard");
      } catch (err) {
        setStatus("error");
        setError(
          err instanceof Error ? err.message : "Failed to parse the file."
        );
      }
    },
    [setRawRows, router]
  );

  const handleSkip = useCallback(() => {
    // Navigate without setting rawRows — dashboard will use demo data.
    router.push("/dashboard");
  }, [router]);

  return (
    <main className="flex min-h-screen items-center justify-center bg-neutral-50 dark:bg-neutral-950 p-6">
      <div className="w-full max-w-lg">
        <div className="mb-8 text-center">
          <h1 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100">
            Caizin Org Chart
          </h1>
          <p className="mt-2 text-sm text-neutral-500">
            Upload your Excel file to visualize organizational structure
          </p>
        </div>

        <UploadZone
          onFileSelected={handleFile}
          disabled={status === "loading"}
        />
        <UploadStatus status={status} error={error} validation={null} />

        <div className="mt-6 text-center">
          <button
            onClick={handleSkip}
            disabled={status === "loading"}
            className="text-sm text-neutral-500 hover:text-neutral-900 dark:hover:text-neutral-100 underline underline-offset-4 transition-colors disabled:opacity-40"
          >
            Skip — use demo data
          </button>
        </div>
      </div>
    </main>
  );
}
