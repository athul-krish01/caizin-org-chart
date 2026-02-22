import { CheckCircle, AlertCircle, Loader2 } from "lucide-react";
import type { ValidationResult } from "@/lib/types/employee";
import { cn } from "@/lib/utils";

interface UploadStatusProps {
  status: "idle" | "loading" | "success" | "error";
  error: string | null;
  validation: ValidationResult | null;
}

export function UploadStatus({ status, error, validation }: UploadStatusProps) {
  if (status === "idle") return null;

  return (
    <div className="mt-4 space-y-3">
      {status === "loading" && (
        <div className="flex items-center gap-2 text-sm text-neutral-500">
          <Loader2 className="h-4 w-4 animate-spin" />
          Processing file...
        </div>
      )}

      {status === "error" && (
        <div className="flex items-start gap-2 rounded-lg border border-red-200 dark:border-red-900 bg-red-50 dark:bg-red-950/20 p-3">
          <AlertCircle className="h-4 w-4 mt-0.5 text-red-500 shrink-0" />
          <p className="text-sm text-red-700 dark:text-red-400">
            {error}
          </p>
        </div>
      )}

      {status === "success" && (
        <div className="flex items-start gap-2 rounded-lg border border-green-200 dark:border-green-900 bg-green-50 dark:bg-green-950/20 p-3">
          <CheckCircle className="h-4 w-4 mt-0.5 text-green-500 shrink-0" />
          <p className="text-sm text-green-700 dark:text-green-400">
            File uploaded and processed successfully.
          </p>
        </div>
      )}

      {validation && validation.errors.length > 0 && (
        <div className="space-y-1">
          <p className="text-xs font-medium text-red-600 dark:text-red-400">
            Validation errors:
          </p>
          {validation.errors.map((err, i) => (
            <p
              key={i}
              className={cn(
                "text-xs text-red-600 dark:text-red-400 pl-4",
                "before:content-['•'] before:mr-1"
              )}
            >
              {err.message}
            </p>
          ))}
        </div>
      )}

      {validation && validation.warnings.length > 0 && (
        <div className="space-y-1">
          <p className="text-xs font-medium text-amber-600 dark:text-amber-400">
            Warnings:
          </p>
          {validation.warnings.map((warn, i) => (
            <p
              key={i}
              className={cn(
                "text-xs text-amber-600 dark:text-amber-400 pl-4",
                "before:content-['•'] before:mr-1"
              )}
            >
              {warn}
            </p>
          ))}
        </div>
      )}
    </div>
  );
}
