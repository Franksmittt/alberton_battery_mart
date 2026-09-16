import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { isAiOrSearchCrawler, MARKDOWN_ALTERNATES } from "@/lib/ai-crawlers";
import { BASE_URL } from "@/lib/seo-constants";

const productIdPattern = /^\/products\/(\d+)$/;
const isDev = process.env.NODE_ENV === "development";
const PUBLIC_FILE_PATTERN = /\.(.*)$/;

const AB_TEST_PATHS = ["/", "/services"];
const AB_COOKIE = "cta-test-bucket";

function handleAbTesting(request: NextRequest) {
  if (!AB_TEST_PATHS.includes(request.nextUrl.pathname)) return null;

  const existingBucket = request.cookies.get(AB_COOKIE)?.value;
  let bucket = existingBucket;

  if (!bucket) {
    bucket = Math.random() < 0.5 ? "control" : "variant";
  }

  const response = NextResponse.next();

  if (!existingBucket) {
    response.cookies.set(AB_COOKIE, bucket, {
      maxAge: 60 * 60 * 24 * 30,
      path: "/",
    });
  }

  response.headers.set("x-ab-bucket", bucket);
  if (isDev) {
    console.info("[middleware] ab-bucket", {
      path: request.nextUrl.pathname,
      bucket,
      existingBucket,
    });
  }
  return response;
}

function addLlmDiscoveryHeaders(request: NextRequest, response: NextResponse) {
  const pathname = request.nextUrl.pathname;
  const markdownPath = MARKDOWN_ALTERNATES[pathname];
  const links = [`<${BASE_URL}/llms.txt>; rel="describedby"`];

  if (markdownPath) {
    links.push(
      `<${BASE_URL}${markdownPath}>; rel="alternate"; type="text/markdown"`
    );
  }

  for (const link of links) {
    response.headers.append("Link", link);
  }
  return response;
}

function addSecurityHeaders(response: NextResponse) {
  // Security headers for better Lighthouse scores
  response.headers.set(
    "Strict-Transport-Security",
    "max-age=31536000; includeSubDomains"
  );

  response.headers.set("X-Frame-Options", "SAMEORIGIN");

  response.headers.set("X-Content-Type-Options", "nosniff");

  response.headers.set("Referrer-Policy", "strict-origin-when-cross-origin");

  response.headers.set(
    "Permissions-Policy",
    "camera=(), microphone=(), geolocation=()"
  );

  // Content Security Policy - allow Google Tag Manager and Google Ads
  response.headers.set(
    "Content-Security-Policy",
    "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com https://www.google-analytics.com https://googleads.g.doubleclick.net https://www.google.com https://www.google.co.za https://web3forms.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; img-src 'self' data: https: blob:; connect-src 'self' https://www.google-analytics.com https://www.googletagmanager.com https://analytics.google.com https://web3forms.com https://api.web3forms.com; frame-src https://www.google.com;"
  );

  // Cross-Origin policies
  response.headers.set("Cross-Origin-Opener-Policy", "same-origin-allow-popups");

  response.headers.set("Cross-Origin-Resource-Policy", "cross-origin");

  return response;
}

function finalizeResponse(request: NextRequest, response: NextResponse) {
  addSecurityHeaders(response);
  addLlmDiscoveryHeaders(request, response);
  return response;
}

export function middleware(request: NextRequest) {
  const userAgent = request.headers.get("user-agent") || "";
  const pathname = request.nextUrl.pathname;

  // Protect admin API routes (except login and check)
  if (
    pathname.startsWith("/api/admin/") &&
    !pathname.includes("/login") &&
    !pathname.includes("/check") &&
    !pathname.includes("/logout")
  ) {
    const session = request.cookies.get("admin_session");
    if (!session || session.value !== "authenticated") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
  }

  if (
    pathname.startsWith("/api/") ||
    pathname.startsWith("/_next/") ||
    PUBLIC_FILE_PATTERN.test(pathname)
  ) {
    const response = NextResponse.next();
    return finalizeResponse(request, response);
  }

  const legacyProductMatch = request.nextUrl.pathname.match(productIdPattern);
  if (legacyProductMatch) {
    const url = request.nextUrl.clone();
    url.pathname = `/products/id/${legacyProductMatch[1]}`;
    if (isDev) {
      console.info("[middleware] legacy-product-rewrite", {
        from: request.nextUrl.pathname,
        to: url.pathname,
      });
    }
    const response = NextResponse.redirect(url, 308);
    return finalizeResponse(request, response);
  }

  // Search engines and AI answer engines must see the canonical page.
  // Do not geo-rewrite HTML — that is cloaking for Googlebot vs ZA users
  // and it feeds ChatGPT-User / Claude-User / Perplexity-User the wrong URL.
  if (isAiOrSearchCrawler(userAgent)) {
    const response = NextResponse.next();
    return finalizeResponse(request, response);
  }

  const abResponse = handleAbTesting(request);
  if (abResponse) return finalizeResponse(request, abResponse);

  const response = NextResponse.next();
  return finalizeResponse(request, response);
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
