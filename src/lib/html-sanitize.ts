/**
 * Server-safe HTML for blog bodies (no jsdom — avoids Vercel ESM/CJS issues from isomorphic-dompurify).
 */
import sanitizeHtml, { type IOptions } from "sanitize-html";

const BLOG_SANITIZE_OPTIONS: IOptions = {
  allowedTags: [
    ...(sanitizeHtml.defaults.allowedTags ?? []),
    "h1",
    "h2",
    "h3",
    "h4",
    "h5",
    "h6",
    "img",
    "span",
    "div",
    "figure",
    "figcaption",
    "sup",
    "sub",
    "del",
    "ins",
    "table",
    "thead",
    "tbody",
    "tr",
    "th",
    "td",
    "colgroup",
    "col",
  ],
  allowedAttributes: {
    ...sanitizeHtml.defaults.allowedAttributes,
    a: ["href", "name", "target", "rel", "class"],
    img: [
      "src",
      "alt",
      "title",
      "width",
      "height",
      "class",
      "loading",
      "decoding",
    ],
    code: ["class"],
    pre: ["class"],
    p: ["class"],
    span: ["class"],
    div: ["class"],
    th: ["colspan", "rowspan", "class"],
    td: ["colspan", "rowspan", "class"],
    table: ["class"],
    "*": ["class", "id"],
  },
  allowedSchemes: ["http", "https", "mailto", "tel"],
  allowedSchemesByTag: {
    img: ["http", "https", "data"],
  },
  allowProtocolRelative: false,
};

export function sanitizeBlogHtmlContent(html: string): string {
  return sanitizeHtml(html, BLOG_SANITIZE_OPTIONS);
}
