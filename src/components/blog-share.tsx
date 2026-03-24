"use client";

import { useCallback, useState, useSyncExternalStore } from "react";
import { CheckIcon, Link2Icon, Share2Icon, XIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { FaFacebook, FaLinkedin, FaShare, FaXTwitter } from "react-icons/fa6";

const actionClass =
  "inline-flex h-9 shrink-0 items-center justify-center gap-1.5 rounded-lg border border-white/20 bg-zinc-800/90 px-3.5 text-xs font-medium text-zinc-100 shadow-sm transition-colors hover:border-white/30 hover:bg-zinc-700/95 hover:text-white focus-visible:outline focus-visible:ring-2 focus-visible:ring-white/25 focus-visible:ring-offset-2 focus-visible:ring-offset-gray-900";

type Props = {
  url: string;
  title: string;
  description?: string;
};

export function BlogShare({ url, title, description }: Props) {
  const [copied, setCopied] = useState(false);
  const canNativeShare = useSyncExternalStore(
    () => () => {},
    () =>
      typeof navigator !== "undefined" && typeof navigator.share === "function",
    () => false,
  );

  const copy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  }, [url]);

  const shareNative = useCallback(async () => {
    if (!navigator.share) return;
    try {
      await navigator.share({
        title,
        text: description || title,
        url,
      });
    } catch {
      /* user cancelled or share failed */
    }
  }, [url, title, description]);

  const enc = encodeURIComponent;
  const twitter = `https://twitter.com/intent/tweet?url=${enc(url)}&text=${enc(title)}`;
  const linkedin = `https://www.linkedin.com/sharing/share-offsite/?url=${enc(url)}`;
  const facebook = `https://www.facebook.com/sharer/sharer.php?u=${enc(url)}`;

  return (
    <div className="mt-14 border-t border-white/10 pt-10">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm font-medium text-white/55 flex items-center gap-2">
          <Share2Icon className="size-4 shrink-0 text-white/45" aria-hidden />
          Share
        </p>
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            className={cn(actionClass)}
            onClick={() => void copy()}
          >
            {copied ? (
              <>
                <CheckIcon className="size-3.5" aria-hidden />
                Copied
              </>
            ) : (
              <>
                <Link2Icon className="size-3.5" aria-hidden />
                Copy
              </>
            )}
          </button>
          {canNativeShare ? (
            <button
              type="button"
              className={cn(actionClass)}
              onClick={() => void shareNative()}
            >
              <FaShare />
            </button>
          ) : null}
          <a
            href={twitter}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(actionClass)}
          >
            <FaXTwitter />
          </a>
          <a
            href={linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(actionClass)}
          >
            <FaLinkedin />
          </a>
          <a
            href={facebook}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(actionClass)}
          >
            <FaFacebook />
          </a>
        </div>
      </div>
    </div>
  );
}
