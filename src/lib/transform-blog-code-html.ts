import * as cheerio from "cheerio";

import { buildCodeShellHtml } from "@/lib/blog-code-shared";

/**
 * Replace every `<pre>` (AI/CMS often omits inner `<code>`) with the formatted
 * code shell. Runs on the server so markup is correct before hydration.
 */
export async function transformBlogCodeHtml(html: string): Promise<string> {
  if (!html.includes("<pre")) return html;

  const $ = cheerio.load(html, undefined, false);

  const pres = $("pre")
    .toArray()
    .filter((el) => !$(el).closest(".blog-code-shell").length);

  for (const el of pres) {
    const $pre = $(el);
    const $code = $pre.find("code").first();
    let fullText: string;
    let langClass: string;

    if ($code.length) {
      fullText = $code.text();
      langClass = $code.attr("class") ?? "";
    } else {
      fullText = $pre.text();
      langClass = $pre.attr("class") ?? "";
    }

    const shell = await buildCodeShellHtml(fullText, langClass);
    $pre.replaceWith(shell);
  }

  return $.html();
}
