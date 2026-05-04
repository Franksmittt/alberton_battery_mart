// src/components/content/CodeLookup.tsx
"use client";
import { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'; // Import Card

const CodeLookup = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const router = useRouter(); // Initialize router for navigation
    
    // Handle Form Submission
    const handleSearchSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (searchTerm) {
            // Redirects to the results page using the query parameter
            router.push(`/products/results?q=${encodeURIComponent(searchTerm)}`);
        }
    };
    
    return (
        <Card className="w-full max-w-lg mx-auto shadow-lg bg-card border-border">
            <CardHeader>
                <CardTitle className="text-center text-2xl font-bold text-foreground">
                    Quick Find by Code or Name
                </CardTitle>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSearchSubmit} className="flex w-full space-x-2">
                    <Input
                        type="text"
                        placeholder="Search by Code (e.g., 619, 652, EFB) or Name"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="h-12 text-lg bg-background border-border/50"
                    />
                    <Button type="submit" variant="battery" size="lg" disabled={!searchTerm}>
                        <Search className="h-5 w-5" />
                    </Button>
                </form>
            </CardContent>
        </Card>
    );
};

export default CodeLookup;