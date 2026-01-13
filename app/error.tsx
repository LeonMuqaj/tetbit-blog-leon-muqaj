"use client";

import ErrorState from "@/components/ErrorState";
import { useEffect } from "react";

interface ErrorPageProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function Error({ error, reset }: ErrorPageProps) {
  useEffect(() => {
    console.error("App Error:", error);
  }, [error]);

  return <ErrorState type="server-error" showRetryButton onRetry={reset} />;
}
