import { revalidatePath, revalidateTag } from "next/cache";
import { NextResponse } from "next/server";

/** POST /api/revalidate?secret=… or header x-revalidate-secret (must match REVALIDATE_SECRET). */
export async function POST(request: Request) {
  const secret =
    request.headers.get("x-revalidate-secret") ??
    new URL(request.url).searchParams.get("secret");
  const expected = process.env.REVALIDATE_SECRET;
  if (!expected || secret !== expected) {
    return NextResponse.json({ ok: false }, { status: 401 });
  }

  revalidateTag("cms-site", "max");
  revalidateTag("cms-blog", "max");
  revalidatePath("/");
  revalidatePath("/blog");
  revalidatePath("/projects");

  return NextResponse.json({ revalidated: true, now: Date.now() });
}
