// Server-only product catalog storage — filesystem locally, Vercel Blob REST API in production.
import { promises as fs } from "fs";
import path from "path";
import { ProductCardData } from "@/data/products";
import { ALL_PRODUCTS } from "@/data/products";
import { formatProductPrice } from "@/lib/formatting";

const PRODUCTS_FILE = path.join(process.cwd(), "data", "products.json");
const BLOB_PATHNAME = "catalog/products.json";
const BLOB_API = "https://blob.vercel-storage.com";

function normalizeProduct(product: ProductCardData): ProductCardData {
  return {
    ...product,
    sellingPrice_OUTPUT: formatProductPrice(product.sellingPrice_OUTPUT),
  };
}

function normalizeProducts(products: ProductCardData[]): ProductCardData[] {
  return products.map(normalizeProduct);
}

function shouldUseBlobStorage(): boolean {
  return Boolean(process.env.BLOB_READ_WRITE_TOKEN);
}

function blobHeaders(contentType = "application/json"): HeadersInit {
  return {
    authorization: `Bearer ${process.env.BLOB_READ_WRITE_TOKEN}`,
    "x-content-type": contentType,
    "x-add-random-suffix": "0",
    "x-allow-overwrite": "1",
  };
}

async function readProductsFromFilesystem(): Promise<ProductCardData[]> {
  await initializeProductsFile();
  const fileContent = await fs.readFile(PRODUCTS_FILE, "utf-8");
  const products = JSON.parse(fileContent) as ProductCardData[];
  return normalizeProducts(products);
}

async function writeProductsToFilesystem(products: ProductCardData[]): Promise<void> {
  await initializeProductsFile();
  await fs.writeFile(
    PRODUCTS_FILE,
    JSON.stringify(normalizeProducts(products), null, 2),
    "utf-8"
  );
}

async function readProductsFromBlob(): Promise<ProductCardData[] | null> {
  const cachedUrl = process.env.BLOB_PRODUCTS_URL;
  if (cachedUrl) {
    const response = await fetch(cachedUrl, { cache: "no-store" });
    if (response.ok) {
      return normalizeProducts((await response.json()) as ProductCardData[]);
    }
  }

  const listResponse = await fetch(
    `${BLOB_API}?prefix=${encodeURIComponent(BLOB_PATHNAME)}`,
    {
      headers: { authorization: `Bearer ${process.env.BLOB_READ_WRITE_TOKEN}` },
      cache: "no-store",
    }
  );

  if (!listResponse.ok) {
    return null;
  }

  const listData = (await listResponse.json()) as { blobs?: Array<{ url: string }> };
  const blobUrl = listData.blobs?.[0]?.url;
  if (!blobUrl) {
    return null;
  }

  const response = await fetch(blobUrl, { cache: "no-store" });
  if (!response.ok) {
    return null;
  }

  return normalizeProducts((await response.json()) as ProductCardData[]);
}

async function writeProductsToBlob(products: ProductCardData[]): Promise<void> {
  const response = await fetch(`${BLOB_API}/${BLOB_PATHNAME}`, {
    method: "PUT",
    headers: blobHeaders(),
    body: JSON.stringify(normalizeProducts(products), null, 2),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Failed to write products blob (${response.status}): ${errorText}`);
  }
}

export async function initializeProductsFile() {
  try {
    await fs.access(PRODUCTS_FILE);
  } catch {
    const dir = path.dirname(PRODUCTS_FILE);
    await fs.mkdir(dir, { recursive: true });
    await fs.writeFile(
      PRODUCTS_FILE,
      JSON.stringify(normalizeProducts(ALL_PRODUCTS), null, 2),
      "utf-8"
    );
  }
}

export async function getProducts(): Promise<ProductCardData[]> {
  if (shouldUseBlobStorage()) {
    const blobProducts = await readProductsFromBlob();
    if (blobProducts) {
      return blobProducts;
    }

    const seed = await readProductsFromFilesystem();
    await writeProductsToBlob(seed);
    return seed;
  }

  return readProductsFromFilesystem();
}

export async function saveProducts(products: ProductCardData[]): Promise<void> {
  const normalized = normalizeProducts(products);

  await writeProductsToFilesystem(normalized);

  if (shouldUseBlobStorage()) {
    await writeProductsToBlob(normalized);
  }
}
