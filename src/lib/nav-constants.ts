// src/lib/nav-constants.ts
// This is the single source of truth for your site's navigation.
// Import this in both Header.tsx and MobileNav.tsx.

// --- FIX: Define a shared interface for all nav items ---
export interface NavItem {
  href: string;
  label: string;
  isCta?: boolean; // Make isCta optional
}

export const navItems: NavItem[] = [
  { href: "/", label: "Home" },
  { href: "/visit", label: "Visit the shop" },
  { href: "/products", label: "Batteries" },
  { href: "/warranty", label: "Warranty" },
  { href: "/services", label: "Fitment & Testing" },
  { href: "/contact", label: "Contact Us" },
];

// This is a separate array for the mobile menu's CTA button
export const mobileCtaItem: NavItem = { 
  href: "/visit", 
  label: "Get Directions", 
  isCta: true 
};