import { sanitizeBlogHtmlContent } from "@/lib/html-sanitize";

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

/**
 * Safe HTML for testimonial bodies: rich text from the CMS, or legacy plain text
 * wrapped in a paragraph.
 */
export function testimonialQuoteToSafeHtml(raw: string): string {
  const t = raw.trim();
  if (!t) return "";
  if (t.startsWith("<")) {
    return sanitizeBlogHtmlContent(t);
  }
  return sanitizeBlogHtmlContent(`<p>${escapeHtml(t)}</p>`);
}
