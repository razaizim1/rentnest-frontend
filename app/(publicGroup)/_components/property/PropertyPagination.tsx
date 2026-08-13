"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useTransition } from "react";

import { Button } from "@/components/ui/button";

type PropertyPaginationProps = {
    currentPage: number;
    totalPages: number;
};

export function PropertyPagination({
    currentPage,
    totalPages,
}: PropertyPaginationProps) {
    const router = useRouter();
    const searchParams = useSearchParams();

    const [isPending, startTransition] = useTransition();

    if (totalPages <= 1) {
        return null;
    }

    const goToPage = (page: number) => {
        if (
            page < 1 ||
            page > totalPages ||
            page === currentPage ||
            isPending
        ) {
            return;
        }

        const params = new URLSearchParams(
            searchParams.toString()
        );

        params.set("page", String(page));

        if (!params.get("limit")) {
            params.set("limit", "6");
        }

        startTransition(() => {
            router.replace(
                `/properties?${params.toString()}`
            );
        });
    };

    return (
        <div className="mt-10 flex items-center justify-center gap-2">
            <Button
                variant="outline"
                disabled={currentPage === 1 || isPending}
                onClick={() => goToPage(currentPage - 1)}
            >
                {isPending ? "Loading..." : "Previous"}
            </Button>

            {Array.from(
                { length: totalPages },
                (_, index) => index + 1
            ).map((page) => (
                <Button
                    key={page}
                    variant={
                        page === currentPage
                            ? "default"
                            : "outline"
                    }
                    disabled={isPending}
                    onClick={() => goToPage(page)}
                >
                    {page}
                </Button>
            ))}

            <Button
                variant="outline"
                disabled={
                    currentPage === totalPages || isPending
                }
                onClick={() => goToPage(currentPage + 1)}
            >
                {isPending ? "Loading..." : "Next"}
            </Button>
        </div>
    );
}