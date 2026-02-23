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
    <main className="flex min-h-screen items-center justify-center bg-background p-6">
      <div className="w-full max-w-lg">
        <div className="mb-10 text-center">
          <h1 className="text-[22px] font-semibold tracking-tight text-foreground">
            Caizin Org Chart
          </h1>
          <p className="mt-1.5 text-[13px] text-muted-foreground">
            Upload your Excel file to visualize organizational structure
          </p>
        </div>

        <div className="rounded-[10px] border border-border bg-card p-1 shadow-[0_1px_3px_rgba(0,0,0,0.04)]">
          <UploadZone
            onFileSelected={handleFile}
            disabled={status === "loading"}
          />
        </div>
        <UploadStatus status={status} error={error} validation={null} />

        <div className="mt-8 text-center">
          <button
            onClick={handleSkip}
            disabled={status === "loading"}
            className="text-[13px] text-muted-foreground underline underline-offset-4 transition-colors hover:text-foreground disabled:opacity-40"
          >
            Skip &mdash; use demo data
          </button>
        </div>
      </div>
    </main>
  );
}
