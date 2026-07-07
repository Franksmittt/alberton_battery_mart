import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { getProducts } from "@/lib/products-storage";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export async function GET() {
  const cookieStore = cookies();
  const session = cookieStore.get("admin_session");
  if (session?.value !== "authenticated") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const hasBlobToken = Boolean(process.env.BLOB_READ_WRITE_TOKEN);
  const hasBlobStoreId = Boolean(process.env.BLOB_STORE_ID);
  const hasOidc = Boolean(process.env.VERCEL_OIDC_TOKEN);
  const blobConfigured = hasBlobToken || (hasBlobStoreId && hasOidc);

  let blobProductCount: number | null = null;
  let blobReadOk = false;

  if (blobConfigured) {
    try {
      const products = await getProducts();
      blobProductCount = products.length;
      blobReadOk = true;
    } catch {
      blobReadOk = false;
    }
  }

  return NextResponse.json({
    blobConfigured,
    hasBlobToken,
    hasBlobStoreId,
    hasOidc,
    blobStoreAccess: process.env.BLOB_STORE_ACCESS || "private",
    blobReadOk,
    blobProductCount,
    ready: blobConfigured && blobReadOk,
    hint: blobConfigured
      ? null
      : "Connect abm2-blob to this project in Vercel → Storage → abm2-blob → Projects → Connect, then redeploy.",
  });
}
