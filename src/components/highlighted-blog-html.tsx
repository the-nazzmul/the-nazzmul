"use client";

import { useLayoutEffect, useRef } from "react";

type Props = {
  html: string;
  className: string;
};

function base64ToUtf8(b64: string): string {
  const bin = atob(b64);
  const bytes = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; i++) bytes[i] = bin.charCodeAt(i);
  return new TextDecoder().decode(bytes);
}

/**
 * HTML is transformed on the server (`transformBlogCodeHtml`). This client layer
 * only wires copy buttons (clipboard API).
 */
export function HighlightedBlogHtml({ html, className }: Props) {
  const rootRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const onClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      const btn = target?.closest?.(".blog-code-copy-btn") as HTMLButtonElement | null;
      if (!btn || !root.contains(btn)) return;
      const b64 = btn.getAttribute("data-code-copy");
      if (!b64) return;
      let text: string;
      try {
        text = base64ToUtf8(b64);
      } catch {
        return;
      }
      void (async () => {
        try {
          await navigator.clipboard.writeText(text);
          btn.setAttribute("data-copied", "true");
          window.setTimeout(() => btn.removeAttribute("data-copied"), 2000);
        } catch {
          btn.setAttribute("data-error", "true");
          window.setTimeout(() => btn.removeAttribute("data-error"), 2000);
        }
      })();
    };

    root.addEventListener("click", onClick);
    return () => root.removeEventListener("click", onClick);
  }, [html]);

  return (
    <div
      ref={rootRef}
      className={className}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
