// src/components/analytics/TrackViewItem.tsx
"use client";

import { useEffect } from "react";
import { ProductCardData } from "@/data/products";

// --- NEW: Define a type for the dataLayer ---
declare global {
  interface Window {
    dataLayer: any[];
  }
}

// Helper to convert "R 1,450.00" to 1450.00
const parsePrice = (price: string): number => {
  try {
    const numericString = price.replace("R", "").replace(/,/g, "").trim();
    return parseFloat(numericString);
  } catch (e) {
    return 0;
  }
};

interface TrackViewItemProps {
  product: ProductCardData;
}

// This component renders nothing. It just fires the tracking event.
export const TrackViewItem: React.FC<TrackViewItemProps> = ({ product }) => {
  
  useEffect(() => {
    if (!product) return;

    try {
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({
        event: 'view_item',
        ecommerce: {
          currency: 'ZAR', // --- Set to South African Rand
          value: parsePrice(product.sellingPrice_OUTPUT),
          items: [
            {
              item_id: product.id.toString(), // Use ID as it's the unique identifier
              item_name: product.name,
              item_brand: product.brandName,
              item_category: product.category,
              price: parsePrice(product.sellingPrice_OUTPUT),
              quantity: 1
            }
          ]
        }
      });
      console.log(`GA4 Event: view_item pushed for ${product.name}`);
    } catch (error) {
      console.error("Error pushing view_item to dataLayer:", error);
    }

  }, [product]); // Fire once when product data is available

  return null; // This component does not render any HTML
};