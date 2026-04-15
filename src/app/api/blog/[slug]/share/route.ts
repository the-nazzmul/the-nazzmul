import { NextResponse } from "next/server";

import { getCmsPublicOrigin } from "@/lib/blog-cms";

type Params = { params: Promise<{ slug: string }> };

/**
 * Same-origin proxy for share-count POSTs (avoids CORS to CMS).
 */
export async function POST(request: Request, { params }: Params) {
  const cms = getCmsPublicOrigin();
  if (!cms) {
    return NextResponse.json(
      { ok: false, error: "CMS not configured" },
      { status: 503 },
    );
  }

  const { slug } = await params;
  const safe = encodeURIComponent((slug ?? "").trim());
  if (!safe) {
    return NextResponse.json({ error: "Invalid slug" }, { status: 400 });
  }

  const fwd = request.headers.get("x-forwarded-for");
  const realIp = request.headers.get("x-real-ip");
  const headers = new Headers({
    "Content-Type": "application/json",
  });
  if (fwd) headers.set("x-forwarded-for", fwd);
  if (realIp) headers.set("x-real-ip", realIp);

  let body = "{}";
  try {
    const ct = request.headers.get("content-type") ?? "";
    if (ct.includes("application/json")) {
      body = await request.text();
    }
  } catch {
    body = "{}";
  }

  try {
    const upstream = await fetch(
      `${cms}/api/public/blog/${safe}/share`,
      {
        method: "POST",
        headers,
        body: body || "{}",
        cache: "no-store",
      },
    );
    const text = await upstream.text();
    return new NextResponse(text, {
      status: upstream.status,
      headers: {
        "Content-Type":
          upstream.headers.get("Content-Type") ?? "application/json",
        "Cache-Control": "private, no-store",
      },
    });
  } catch (e) {
    console.error("[api/blog/share] proxy failed", e);
    return NextResponse.json({ error: "Upstream error" }, { status: 502 });
  }
}
