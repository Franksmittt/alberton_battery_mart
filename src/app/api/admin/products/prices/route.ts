import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { getProducts, saveProducts } from "@/lib/products-storage";
import { formatProductPrice } from "@/lib/formatting";
import { revalidateAfterProductSave } from "@/lib/revalidate-product-paths";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

type PriceUpdate = {
  id: number;
  sellingPrice_OUTPUT: string;
};

async function isAuthenticated(): Promise<boolean> {
  const cookieStore = cookies();
  const session = cookieStore.get("admin_session");
  return session?.value === "authenticated";
}

export async function PATCH(request: NextRequest) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = (await request.json()) as { updates?: PriceUpdate[] };
    const updates = Array.isArray(body.updates) ? body.updates : [];

    if (updates.length === 0) {
      return NextResponse.json({ error: "No price updates provided" }, { status: 400 });
    }

    const products = await getProducts();
    const changedIds: number[] = [];

    for (const update of updates) {
      const index = products.findIndex((product) => product.id === update.id);
      if (index === -1) {
        continue;
      }

      const formattedPrice = formatProductPrice(update.sellingPrice_OUTPUT);
      if (products[index].sellingPrice_OUTPUT !== formattedPrice) {
        products[index] = {
          ...products[index],
          sellingPrice_OUTPUT: formattedPrice,
        };
        changedIds.push(update.id);
      }
    }

    if (changedIds.length === 0) {
      return NextResponse.json({ updated: 0, changedIds: [] });
    }

    await saveProducts(products);
    await revalidateAfterProductSave(changedIds);

    return NextResponse.json({
      updated: changedIds.length,
      changedIds,
      message: `Saved ${changedIds.length} price${changedIds.length === 1 ? "" : "s"}. Website updated.`,
    });
  } catch (error) {
    console.error("[admin/prices]", error);
    return NextResponse.json({ error: "Failed to save prices" }, { status: 500 });
  }
}
