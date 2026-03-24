import { Badge } from "@/components/ui/badge";

/** One badge per tag — same pattern as project technology chips. */
export function BlogPostTagBadges({ tags }: { tags: string[] }) {
  if (!tags.length) return null;
  return (
    <div
      className="flex flex-wrap gap-x-1.5 gap-y-2 mt-5"
      aria-label="Post tags"
      role="list"
    >
      {tags.map((tag, i) => (
        <Badge
          key={`${tag}-${i}`}
          variant="outline"
          className="text-white/70"
          role="listitem"
        >
          {tag}
        </Badge>
      ))}
    </div>
  );
}
