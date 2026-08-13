"use client";

import { Search } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

import { Input } from "@/components/ui/input";

export function PropertySearch() {
    const router = useRouter();
    const searchParams = useSearchParams();

    const currentSearch = searchParams.get("search") || "";

    const [search, setSearch] = useState(currentSearch);

    useEffect(() => {
        if (search.trim() === currentSearch) {
            return;
        }

        const timer = setTimeout(() => {
            const params = new URLSearchParams(
                searchParams.toString()
            );

            if (search.trim()) {
                params.set("search", search.trim());
            } else {
                params.delete("search");
            }

            params.delete("page");

            const query = params.toString();

            router.replace(
                query
                    ? `/properties?${query}`
                    : "/properties"
            );
        }, 500);

        return () => clearTimeout(timer);
    }, [search, currentSearch, searchParams, router]);

    return (
        <div className="relative">
            <Search
                size={20}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground"
            />

            <Input
                type="search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search by property name or location..."
                className="h-14 rounded-xl border-0 bg-transparent pl-12 pr-4 text-base shadow-none focus-visible:ring-0"
            />
        </div>
    );
}