import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
    return (
        <main className="container mx-auto px-4 py-10">
            {/* Back button */}
            <Skeleton className="mb-8 h-10 w-36" />

            <div className="grid gap-10 lg:grid-cols-2">

                {/* Image */}
                <Skeleton className="h-[500px] w-full rounded-2xl" />

                {/* Details */}
                <div className="space-y-6">

                    {/* Category */}
                    <Skeleton className="h-6 w-24" />

                    {/* Title */}
                    <Skeleton className="h-12 w-3/4" />

                    {/* Location */}
                    <Skeleton className="h-5 w-40" />

                    {/* Price */}
                    <Skeleton className="h-10 w-52" />

                    {/* Features */}
                    <div className="grid grid-cols-2 gap-4">
                        <Skeleton className="h-20 rounded-xl" />
                        <Skeleton className="h-20 rounded-xl" />
                        <Skeleton className="h-20 rounded-xl" />
                        <Skeleton className="h-20 rounded-xl" />
                    </div>

                    {/* Description */}
                    <div className="space-y-3">
                        <Skeleton className="h-7 w-32" />
                        <Skeleton className="h-4 w-full" />
                        <Skeleton className="h-4 w-11/12" />
                        <Skeleton className="h-4 w-4/5" />
                    </div>

                    {/* Amenities */}
                    <div className="space-y-3">
                        <Skeleton className="h-7 w-28" />

                        <div className="grid grid-cols-2 gap-3">
                            <Skeleton className="h-6 w-24" />
                            <Skeleton className="h-6 w-24" />
                            <Skeleton className="h-6 w-24" />
                            <Skeleton className="h-6 w-24" />
                        </div>
                    </div>

                    {/* Action */}
                    <Skeleton className="h-11 w-40" />

                </div>
            </div>
        </main>
    );
}