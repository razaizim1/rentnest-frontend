import { PropertySkeleton } from "./PropertySkeleton";

export function PropertySkeletonGrid() {
    return (
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, index) => (
                <PropertySkeleton key={index} />
            ))}
        </div>
    );
}