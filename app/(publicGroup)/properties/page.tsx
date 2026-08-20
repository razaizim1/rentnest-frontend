import { PropertiesPageProps } from "@/lib/types";

import { getProperties } from "../_actions/getProperties";
import { PropertyGrid } from "../_components/property/PropertyGrid";
import { PropertySearch } from "../_components/property/PropertySearch";
import { PropertyEmpty } from "../_components/property/PropertyEmpty";
import { PropertyFilter } from "../_components/property/PropertyFilter";
import { PropertyPagination } from "../_components/property/PropertyPagination";

export default async function PropertiesPage({
    searchParams,
}: PropertiesPageProps) {
    const params = await searchParams;

    const result = await getProperties({
        search: params.search,
        location: params.location,
        price: params.price,
        minPrice: params.minPrice,
        amenities: params.amenities,
        type: params.type,
        availability: params.availability,
        page: params.page || "1",
        limit: params.limit || "6",
    });

    if (!result.success) {
        throw new Error(result.message);
    }

    const properties = result?.data?.data ?? [];
    const meta = result?.data?.meta;
    const total = Number(meta?.total || 0);
    const currentPage = Number(meta?.page || 1);
    const pageSize = Number(meta?.pageSize || 6);
    const totalPages = Math.ceil(total / pageSize);

    const hasFilter =
        Boolean(params.search) ||
        Boolean(params.location) ||
        Boolean(params.price) ||
        Boolean(params.minPrice) ||
        Boolean(params.amenities) ||
        Boolean(params.type) ||
        Boolean(params.availability);

    return (
        <main className="min-h-screen bg-muted/20">

            {/* Hero / Header */}
            <section className="border-b bg-background">
                <div className="container mx-auto px-4 py-14 sm:py-16 lg:py-20">

                    <div className="mx-auto max-w-3xl text-center">
                        <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-primary">
                            Find Your Next Home
                        </p>

                        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
                            Find Your Perfect Home
                        </h1>

                        <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-muted-foreground sm:text-lg">
                            Discover comfortable rental properties in your
                            preferred location, budget, and property type.
                        </p>
                    </div>

                    <div className="mx-auto mt-8 max-w-7xl">
                        <div className="rounded-2xl border bg-background p-2 shadow-lg">
                            <PropertySearch />
                        </div>

                        <div className="mx-auto mt-4 max-w-7xl">
                            <PropertyFilter />
                        </div>
                    </div>

                </div>
            </section>

            {/* Properties */}
            <section className="container mx-auto px-4 py-10 sm:py-12">

                {/* Result Header */}
                <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">

                    <div>
                        <p className="text-sm font-medium text-primary">
                            {hasFilter ? "Search Results" : "Latest Listings"}
                        </p>

                        <h2 className="mt-1 text-2xl font-bold tracking-tight sm:text-3xl">
                            {hasFilter
                                ? "Properties matching your search"
                                : "Explore Rental Properties"}
                        </h2>

                        <p className="mt-2 text-sm text-muted-foreground">
                            {total} {total === 1 ? "property" : "properties"} available
                        </p>
                    </div>

                    {hasFilter && (
                        <div className="rounded-full border bg-background px-4 py-2 text-sm text-muted-foreground">
                            Filters applied
                        </div>
                    )}

                </div>

                {/* Property Grid / Empty State */}
                {properties.length > 0 ? (
                    <PropertyGrid properties={properties} />
                ) : (
                    <PropertyEmpty />
                )}

                {/* Pagination */}
                <PropertyPagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                />

            </section>
        </main>
    );
}