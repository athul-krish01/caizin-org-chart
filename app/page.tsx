"use client";

import { useRouter } from "next/navigation";
import { useCallback } from "react";
import { UploadZone } from "@/components/upload/upload-zone";
import { UploadStatus } from "@/components/upload/upload-status";
import { useFileUpload } from "@/hooks/use-file-upload";

export default function Home() {
  const router = useRouter();

  const handleFileLoaded = useCallback(
    (_file: File) => {
      // Phase 2: parse Excel file here
      // For Phase 1, go straight to dashboard with dummy data
      router.push("/dashboard");
    },
    [router]
  );

  const { status, error, handleFile, reset } = useFileUpload(handleFileLoaded);

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
            onClick={() => router.push("/dashboard")}
            className="text-sm text-neutral-500 hover:text-neutral-900 dark:hover:text-neutral-100 underline underline-offset-4 transition-colors"
          >
            Skip — use demo data
          </button>
        </div>
      </div>
    </main>
  );
}
