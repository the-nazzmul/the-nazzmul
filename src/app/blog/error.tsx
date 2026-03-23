"use client";

import Link from "next/link";

export default function BlogError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="min-h-screen bg-gray-900 px-5 py-16 text-center text-white/80">
      <p className="text-sm text-white/45">Something went wrong loading the blog.</p>
      <p className="mt-2 font-mono text-xs text-red-300/90 break-all max-w-lg mx-auto">
        {error.message}
      </p>
      <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
        <button
          type="button"
          onClick={() => reset()}
          className="rounded-lg border border-white/20 bg-zinc-800 px-4 py-2 text-sm hover:bg-zinc-700"
        >
          Try again
        </button>
        <Link href="/" className="text-sm text-white/55 hover:text-white">
          ← Home
        </Link>
      </div>
    </div>
  );
}
