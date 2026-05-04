// src/components/layout/SearchSheetTrigger.tsx
"use client";
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import CodeLookup from "@/components/content/CodeLookup";

const SearchSheetTrigger = () => {
  return (
    <Sheet>
      {/* Trigger Button: Visible in the Header */}
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="text-foreground hover:text-battery hover:bg-transparent">
          <Search className="h-5 w-5" />
          <span className="sr-only">Open Search</span>
        </Button>
      </SheetTrigger>
      
      {/* Sheet Content: Full-screen modal for desktop and slide-in for mobile */}
      <SheetContent side="top" className="h-full w-full max-w-full overflow-y-auto pt-16 md:pt-10">
        <SheetHeader className="text-center pb-8 border-b border-border">
          <SheetTitle className="text-3xl font-extrabold text-foreground">
            Search Our Product Catalog
          </SheetTitle>
        </SheetHeader>
        
        <div className="p-4 md:p-6 lg:p-8">
           <CodeLookup />
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default SearchSheetTrigger;