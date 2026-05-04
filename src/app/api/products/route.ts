import { NextResponse } from 'next/server';
import { getAllProducts } from '@/data/products';

// API route to get all products (reads from JSON if available)
export async function GET() {
  try {
    const products = await getAllProducts();
    return NextResponse.json(products);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch products' },
      { status: 500 }
    );
  }
}

