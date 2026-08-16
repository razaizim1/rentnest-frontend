import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
    return (
        <div className="space-y-8">

            {/* Header */}
            <div className="space-y-3">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-9 w-64" />
                <Skeleton className="h-4 w-96 max-w-full" />
            </div>

            {/* Table */}
            <div className="overflow-hidden rounded-2xl border bg-card">
                {/* Header row */}
                <div className="grid grid-cols-5 gap-4 border-b bg-muted/50 p-5">
                    <Skeleton className="h-4 w-20" />
                    <Skeleton className="h-4 w-20" />
                    <Skeleton className="h-4 w-20" />
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
                            <Skeleton className="h-4 w-32" />
                            <Skeleton className="h-3 w-24" />
                        </div>

                        <div className="space-y-2">
                            <Skeleton className="h-4 w-28" />
                            <Skeleton className="h-3 w-24" />
                        </div>

                        <Skeleton className="h-6 w-24" />

                        <Skeleton className="h-4 w-20" />

                        <Skeleton className="h-4 w-16" />
                    </div>
                ))}
            </div>

            {/* Footer / pagination */}
            <div className="flex items-center justify-between">
                <Skeleton className="h-4 w-32" />
                <div className="flex gap-2">
                    <Skeleton className="h-9 w-24" />
                    <Skeleton className="h-9 w-20" />
                </div>
            </div>
        </div>
    );
}