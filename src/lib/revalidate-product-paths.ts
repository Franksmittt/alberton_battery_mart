import { revalidatePath } from "next/cache";
import { clearProductsSyncCache } from "@/lib/battery-sizes/products-sync";

const PRODUCT_LISTING_PATHS = [
  "/",
  "/products/all",
  "/products/type/automotive",
  "/products/type/performance",
  "/products/type/deep-cycle",
  "/products/type/truck-commercial",
  "/products/type/motorcycle",
  "/products/type/truck-motorcycle",
  "/deep-cycle",
  "/api/products",
  "/api/feeds/primary.xml",
  "/api/feeds/local.xml",
];

export async function revalidateAfterProductSave(changedIds: number[] = []): Promise<void> {
  clearProductsSyncCache();

  for (const path of PRODUCT_LISTING_PATHS) {
    revalidatePath(path);
  }

  for (const id of changedIds) {
    revalidatePath(`/products/id/${id}`);
    revalidatePath(`/product/${id}`);
  }
}
