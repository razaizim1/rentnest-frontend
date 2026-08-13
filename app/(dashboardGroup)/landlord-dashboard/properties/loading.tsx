import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
    return (
        <div className="space-y-8">

            <div className="flex items-end justify-between gap-4">
                <div className="space-y-3">
                    <Skeleton className="h-4 w-32" />
                    <Skeleton className="h-10 w-56" />
                    <Skeleton className="h-5 w-80 max-w-full" />
                </div>

                <Skeleton className="h-10 w-36" />
            </div>

            <Skeleton className="h-4 w-32" />

            <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
                {Array.from({ length: 6 }).map((_, index) => (
                    <div
                        key={index}
                        className="overflow-hidden rounded-2xl border"
                    >
                        <Skeleton className="h-56 w-full" />

                        <div className="space-y-4 p-5">
                            <Skeleton className="h-6 w-32" />
                            <Skeleton className="h-6 w-3/4" />
                            <Skeleton className="h-4 w-1/2" />
                            <Skeleton className="h-8 w-1/2" />

                            <div className="flex gap-2">
                                <Skeleton className="h-10 flex-1" />
                                <Skeleton className="h-10 flex-1" />
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}