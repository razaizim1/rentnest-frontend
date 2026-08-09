
import { getProperties } from "../_actions/getProperties";
import { PropertyGrid } from "../_components/property/PropertyGrid";

export default async function PropertiesPage() {
    // Fetch properties at page level (Server Component — zero client JS needed)
    const result = await getProperties();
    const properties = result?.data || result?.properties || [];
    // console.log(properties.data[0].title);

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

            {
                <PropertyGrid properties={properties.data} />
            }
        </div>
    );
}