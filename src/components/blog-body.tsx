import DOMPurify from "isomorphic-dompurify";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeSanitize from "rehype-sanitize";

function looksLikeRichHtml(content: string) {
  const t = content.trimStart();
  return t.startsWith("<") && /<\/?[a-z][\s\S]*>/i.test(t);
}

const htmlBodyClass =
  "blog-content w-full max-w-none space-y-4 text-[17px] leading-[1.75] text-white/80 [&_a]:text-white [&_a]:underline [&_a]:decoration-white/35 [&_a]:underline-offset-4 [&_a]:transition-colors hover:[&_a]:decoration-white/60 [&_blockquote]:border-l-2 [&_blockquote]:border-white/20 [&_blockquote]:pl-4 [&_blockquote]:italic [&_blockquote]:text-white/55 [&_code]:rounded [&_code]:bg-white/10 [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:text-[0.9em] [&_h2]:mt-12 [&_h2]:mb-4 [&_h2]:font-serif [&_h2]:text-3xl [&_h2]:font-normal [&_h2]:leading-tight [&_h2]:text-white [&_h3]:mt-10 [&_h3]:mb-3 [&_h3]:font-serif [&_h3]:text-xl [&_h3]:font-normal [&_h3]:text-white [&_hr]:my-10 [&_hr]:border-white/10 [&_li]:marker:text-white/35 [&_ol]:my-5 [&_ol]:ml-6 [&_ol]:list-decimal [&_ol]:space-y-2 [&_p]:my-5 [&_strong]:font-semibold [&_strong]:text-white [&_ul]:my-5 [&_ul]:ml-6 [&_ul]:list-disc [&_ul]:space-y-2";

export function BlogBody({ content }: { content: string }) {
  if (looksLikeRichHtml(content)) {
    const clean = DOMPurify.sanitize(content, { USE_PROFILES: { html: true } });
    return (
      <div
        className={htmlBodyClass}
        dangerouslySetInnerHTML={{ __html: clean }}
      />
    );
  }

  return (
    <div className={htmlBodyClass}>
      <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeSanitize]}>
        {content}
      </ReactMarkdown>
    </div>
  );
}
