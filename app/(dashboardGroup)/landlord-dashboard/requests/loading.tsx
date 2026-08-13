import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
    return (
        <div className="space-y-8">

            <div className="space-y-3">
                <Skeleton className="h-4 w-32" />
                <Skeleton className="h-10 w-64" />
                <Skeleton className="h-5 w-96 max-w-full" />
            </div>

            <div className="grid gap-6 lg:grid-cols-2">
                {Array.from({ length: 4 }).map((_, index) => (
                    <div
                        key={index}
                        className="space-y-5 rounded-xl border p-6"
                    >
                        <Skeleton className="h-6 w-3/4" />
                        <Skeleton className="h-4 w-1/2" />
                        <Skeleton className="h-20 w-full" />
                        <Skeleton className="h-8 w-1/2" />
                        <Skeleton className="h-10 w-full" />
                    </div>
                ))}
            </div>

        </div>
    );
}