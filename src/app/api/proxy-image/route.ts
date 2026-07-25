import { NextRequest, NextResponse } from "next/server";

const ALLOWED_HOSTS = new Set([
  "www.albertonbatterymart.co.za",
  "albertonbatterymart.co.za",
]);

function isAllowedUrl(rawUrl: string): boolean {
  try {
    const parsed = new URL(rawUrl);
    if (parsed.protocol !== "https:" && parsed.protocol !== "http:") return false;
    if (ALLOWED_HOSTS.has(parsed.hostname)) return true;
    // Allow common object-storage / CDN hosts used for catalog images.
    return (
      parsed.hostname.endsWith(".public.blob.vercel-storage.com") ||
      parsed.hostname.endsWith(".blob.vercel-storage.com") ||
      parsed.hostname.endsWith(".googleusercontent.com")
    );
  } catch {
    return false;
  }
}

export async function GET(request: NextRequest) {
  const rawUrl = request.nextUrl.searchParams.get("url");
  if (!rawUrl) {
    return NextResponse.json({ error: "Missing url" }, { status: 400 });
  }

  if (!isAllowedUrl(rawUrl)) {
    return NextResponse.json({ error: "Host not allowed" }, { status: 400 });
  }

  try {
    const upstream = await fetch(rawUrl, {
      headers: {
        Accept: "image/*",
      },
      cache: "force-cache",
    });

    if (!upstream.ok) {
      return NextResponse.json(
        { error: `Upstream failed with ${upstream.status}` },
        { status: 502 }
      );
    }

    const contentType = upstream.headers.get("content-type") || "image/jpeg";
    const buffer = await upstream.arrayBuffer();

    return new NextResponse(buffer, {
      headers: {
        "Content-Type": contentType,
        "Cache-Control": "public, max-age=86400",
      },
    });
  } catch (error) {
    console.error("proxy-image failed", error);
    return NextResponse.json({ error: "Proxy failed" }, { status: 500 });
  }
}
