"use client";

import { Search } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

import { Input } from "@/components/ui/input";

export function AdminUserSearch() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const currentSearch = searchParams.get("search") || "";
    const [search, setSearch] = useState(currentSearch);

    useEffect(() => {
        if (search.trim() === currentSearch) return;

        const timer = setTimeout(() => {
            const params = new URLSearchParams(searchParams.toString());

            if (search.trim()) {
                params.set("search", search.trim());
            } else {
                params.delete("search");
            }

            params.delete("page");

            const query = params.toString();
            router.replace(
                query
                    ? `/admin-dashboard/users?${query}`
                    : "/admin-dashboard/users"
            );
        }, 400);

        return () => clearTimeout(timer);
    }, [search, currentSearch, searchParams, router]);

    return (
        <div className="relative max-w-md">
            <Search
                size={18}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
            />
            <Input
                type="search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search users by name or email..."
                className="pl-10"
            />
        </div>
    );
}
