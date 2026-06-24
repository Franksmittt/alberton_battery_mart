export function parsePriceAmount(price: string | number): number {
  if (typeof price === "number") {
    return Number.isFinite(price) ? price : 0;
  }

  const cleaned = price.replace(/[^\d.]/g, "");
  const value = parseFloat(cleaned);
  return Number.isFinite(value) ? value : 0;
}

export function formatZAR(amount: string | number): string {
  const value = parsePriceAmount(amount);
  const [integerPart, decimalPart = "00"] = value.toFixed(2).split(".");
  const groupedInteger = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, " ");
  return `R ${groupedInteger}.${decimalPart}`;
}

export function formatProductPrice(price: string | number): string {
  return formatZAR(price);
}

export function priceForSchema(price: string | number): string {
  return parsePriceAmount(price).toFixed(2);
}
