
import { PropertiesPageProps } from "@/lib/types";
import { getProperties } from "../_actions/getProperties";
import { PropertyGrid } from "../_components/property/PropertyGrid";
import { PropertySearch } from "../_components/property/PropertySearch";
import { PropertyEmpty } from "../_components/property/PropertyEmpty";

export default async function PropertiesPage({
    searchParams,
}: PropertiesPageProps) {
    const params = await searchParams;

    const result = await getProperties({
        search: params.search,
        location: params.location,
        price: params.price,
        type: params.type,
    });

    const properties = result?.data?.data ?? [];

    return (
        <div className="container mx-auto px-4 py-10">
            <div className="mb-10">
                <h1 className="text-4xl font-bold">
                    Find Your Perfect Home
                </h1>
                <p className="mt-2 text-muted-foreground">
                    Browse from our latest rental properties.
                </p>
            </div>
            <PropertySearch />

            {properties.length > 0 ? (
                <PropertyGrid properties={properties} />
            ) : (
                <PropertyEmpty />
            )}

        </div>
    );
}