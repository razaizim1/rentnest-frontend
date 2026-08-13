import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function PropertySkeleton() {
    return (
        <Card className="overflow-hidden rounded-2xl">
            {/* Image */}
            <Skeleton className="h-60 w-full rounded-none" />

            <CardContent className="space-y-5 p-5">
                {/* Title */}
                <div className="space-y-2">
                    <Skeleton className="h-6 w-3/4" />
                    <Skeleton className="h-4 w-1/2" />
                </div>

                {/* Price */}
                <Skeleton className="h-8 w-1/2" />

                {/* Features */}
                <div className="flex items-center justify-between">
                    <Skeleton className="h-5 w-12" />
                    <Skeleton className="h-5 w-12" />
                    <Skeleton className="h-5 w-20" />
                </div>

                {/* Button */}
                <Skeleton className="h-10 w-full" />
            </CardContent>
        </Card>
    );
}