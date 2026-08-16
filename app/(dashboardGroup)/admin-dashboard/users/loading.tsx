import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
    return (
        <div className="space-y-8">

            {/* Header */}
            <div className="space-y-3">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-9 w-56" />
                <Skeleton className="h-4 w-80" />
            </div>

            {/* Search / controls */}
            <div className="flex flex-col gap-4 sm:flex-row">
                <Skeleton className="h-10 w-full sm:max-w-sm" />
                <Skeleton className="h-10 w-28" />
            </div>

            {/* User Table */}
            <div className="overflow-hidden rounded-2xl border">
                <div className="space-y-0">
                    {Array.from({ length: 8 }).map((_, index) => (
                        <div
                            key={index}
                            className="grid grid-cols-5 items-center gap-4 border-b p-5 last:border-0"
                        >
                            <div className="space-y-2">
                                <Skeleton className="h-4 w-28" />
                                <Skeleton className="h-3 w-36" />
                            </div>

                            <Skeleton className="h-6 w-20" />

                            <Skeleton className="h-6 w-20" />

                            <Skeleton className="h-4 w-24" />

                            <div className="flex justify-end">
                                <Skeleton className="h-9 w-20" />
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Pagination */}
            <div className="flex items-center justify-between">
                <Skeleton className="h-9 w-24" />
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-9 w-24" />
            </div>

        </div>
    );
}