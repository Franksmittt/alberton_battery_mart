// src/components/layout/ProductListPage.tsx
import { ProductCardData } from "@/data/products";
import Link from "next/link";
import Image from "next/image";

// This template is designed to accept a title and a filtered list of products
interface ProductListPageProps {
  title: string;
  description: string;
  products: ProductCardData[]; // Uses the imported interface
}

const ProductListPage: React.FC<ProductListPageProps> = ({ title, description, products }) => {
  return (
    <section className="flex flex-col bg-[#121212] border-2 border-[#2a2a2a]">
      <div className="border-b-2 border-[#2a2a2a] px-8 py-6">
        <h2 className="text-3xl font-black text-white">{title}</h2>
        <p className="text-[#888888] mt-2">{description}</p>
      </div>

      {products.length > 0 ? (
        products.map((product) => (
          <article
            key={product.id}
            className="grid grid-cols-1 md:grid-cols-[180px_1fr_auto] gap-6 md:gap-10 items-center p-8 border-b-2 border-[#2a2a2a] hover:bg-[#1e1e1e] transition-colors"
          >
            <Link
              href={`/products/id/${product.id}`}
              className="relative w-full h-[140px] rounded border border-dashed border-[#2a2a2a] bg-[#0a0a0a] overflow-hidden"
            >
              <Image
                src={product.imagePath || "/images/stock-battery.jpg"}
                alt={product.name}
                fill
                sizes="180px"
                className="object-contain p-3"
              />
            </Link>

            <div className="space-y-3">
              <h3 className="text-[1.5rem] font-black tracking-[-0.5px] text-white">{product.name}</h3>
              <p className="text-[#888888] text-base leading-relaxed max-w-[560px]">
                {product.brandName}{" "}
                {product.category === "Performance AGM/EFB" ? "AGM/EFB" : "standard fitment"} battery with{" "}
                {product.ahCapacity}Ah capacity support and warranty-backed installation options for daily driving and
                fleet reliability.
              </p>
            </div>

            <div className="text-left md:text-right">
              <p className="text-[1.8rem] font-black text-white mb-4">{product.sellingPrice_OUTPUT}</p>
              <Link
                href={`/products/id/${product.id}`}
                className="inline-flex items-center justify-center border-2 border-[#E53935] px-8 py-3 text-[0.9rem] font-extrabold uppercase text-[#E53935] transition-colors hover:bg-[#E53935] hover:text-white"
              >
                View Details
              </Link>
            </div>
          </article>
        ))
      ) : (
        <div className="p-16 text-center">
          <h3 className="text-2xl font-semibold text-white">No matching products found.</h3>
          <p className="text-[#888888] mt-2">Try a different filter or search term.</p>
        </div>
      )}
    </section>
  );
};

export default ProductListPage;