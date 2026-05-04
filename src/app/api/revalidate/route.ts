// src/app/api/revalidate/route.ts
import { NextRequest, NextResponse } from "next/server";
import { revalidatePath, revalidateTag } from "next/cache";

type RevalidatePayload = {
  tags?: string[];
  paths?: string[];
};

const missingSecretResponse = NextResponse.json(
  { message: "Invalid or missing token" },
  { status: 401 }
);

export async function POST(request: NextRequest) {
  const secret = request.nextUrl.searchParams.get("secret");

  if (!secret || secret !== process.env.CMS_REVALIDATE_TOKEN) {
    return missingSecretResponse;
  }

  let body: RevalidatePayload = {};

  try {
    const rawBody = await request.json();
    body = rawBody || {};
  } catch {
    // Ignore JSON parse errors so an empty body can still trigger a full-site revalidation.
  }

  const tags = Array.isArray(body.tags) ? body.tags : [];
  const paths = Array.isArray(body.paths) ? body.paths : [];

  try {
    tags.forEach((tag) => revalidateTag(tag));
    paths.forEach((path) => revalidatePath(path));

    const payload = {
      revalidated: true,
      revalidatedTags: tags,
      revalidatedPaths: paths,
      timestamp: new Date().toISOString(),
    };

    if (process.env.NODE_ENV === "development") {
      console.info("[revalidate]", payload);
    }

    return NextResponse.json(payload);
  } catch (error) {
    console.error("[revalidate:error]", {
      tags,
      paths,
      error,
    });
    return NextResponse.json(
      { message: "Error revalidating content" },
      { status: 500 }
    );
  }
}

