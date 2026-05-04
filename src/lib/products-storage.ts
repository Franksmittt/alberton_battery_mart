// Helper functions to read/write products from JSON file
// This file is server-only and should never be imported in client components
import { promises as fs } from 'fs';
import path from 'path';
import { ProductCardData } from '@/data/products';
import { ALL_PRODUCTS } from '@/data/products';

const PRODUCTS_FILE = path.join(process.cwd(), 'data', 'products.json');

// Initialize JSON file from TypeScript file if it doesn't exist
export async function initializeProductsFile() {
  try {
    await fs.access(PRODUCTS_FILE);
    // File exists, do nothing
  } catch {
    // File doesn't exist, create it from ALL_PRODUCTS
    const dir = path.dirname(PRODUCTS_FILE);
    await fs.mkdir(dir, { recursive: true });
    await fs.writeFile(
      PRODUCTS_FILE,
      JSON.stringify(ALL_PRODUCTS, null, 2),
      'utf-8'
    );
  }
}

export async function getProducts(): Promise<ProductCardData[]> {
  await initializeProductsFile();
  const fileContent = await fs.readFile(PRODUCTS_FILE, 'utf-8');
  return JSON.parse(fileContent);
}

export async function saveProducts(products: ProductCardData[]): Promise<void> {
  await initializeProductsFile();
  await fs.writeFile(
    PRODUCTS_FILE,
    JSON.stringify(products, null, 2),
    'utf-8'
  );
}

