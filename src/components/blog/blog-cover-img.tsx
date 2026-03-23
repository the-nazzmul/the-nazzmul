import { getBlogCoverAbsoluteUrl } from "@/lib/site-url";

type Props = {
  src: string | null | undefined;
  alt: string;
  className?: string;
  priority?: boolean;
};

/**
 * Plain `<img>` for CMS covers — avoids Next/Image optimizer edge cases on Vercel.
 */
export function BlogCoverImg({ src, alt, className, priority }: Props) {
  const url = getBlogCoverAbsoluteUrl(src);
  if (!url) return null;
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={url}
      alt={alt}
      className={className}
      loading={priority ? "eager" : "lazy"}
      decoding="async"
      fetchPriority={priority ? "high" : "auto"}
    />
  );
}
