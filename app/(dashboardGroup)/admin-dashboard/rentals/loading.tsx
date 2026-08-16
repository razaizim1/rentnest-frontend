import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
    return (
        <div className="space-y-8">

            {/* Header */}
            <div className="space-y-3">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-9 w-56" />
                <Skeleton className="h-4 w-96 max-w-full" />
            </div>

            {/* Table */}
            <div className="overflow-hidden rounded-2xl border bg-card">
                {/* Header row */}
                <div className="grid grid-cols-5 gap-4 border-b bg-muted/50 p-5">
                    <Skeleton className="h-4 w-20" />
                    <Skeleton className="h-4 w-24" />
                    <Skeleton className="h-4 w-24" />
                    <Skeleton className="h-4 w-16" />
                    <Skeleton className="h-4 w-20" />
                </div>

                {/* Rows */}
                {Array.from({ length: 8 }).map((_, index) => (
                    <div
                        key={index}
                        className="grid grid-cols-5 items-center gap-4 border-b p-5 last:border-0"
                    >
                        <div className="space-y-2">
                            <Skeleton className="h-4 w-28" />
                            <Skeleton className="h-3 w-36" />
                        </div>

                        <Skeleton className="h-4 w-32" />

                        <Skeleton className="h-4 w-28" />

                        <Skeleton className="h-6 w-20" />

                        <Skeleton className="h-4 w-24" />
                    </div>
                ))}
            </div>

            {/* Footer */}
            <div className="flex items-center justify-end">
                <Skeleton className="h-9 w-24" />
            </div>
        </div>
    );
}