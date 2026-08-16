import Link from "next/link";
import { Plus } from "lucide-react";

import { Button } from "@/components/ui/button";

import { getMyProperties } from "../_actions/getMyProperties";
import { getCategories } from "../_actions/getCategories";

import { LandlordPropertyCard } from "../_components/LandlordPropertyCard";
import { PropertyEmpty } from "../_components/PropertyEmpty";

import { IProperty } from "@/lib/types";

export default async function MyPropertiesPage() {
    const [propertyResult, categoryResult] = await Promise.all([
        getMyProperties(),
        getCategories(),
    ]);

    if (!propertyResult.success) {
        throw new Error(propertyResult.message);
    }

    if (!categoryResult.success) {
        throw new Error(categoryResult.message);
    }

    const properties = propertyResult?.data ?? [];
    const categories = categoryResult?.data ?? [];

    return (
        <div className="space-y-8">

            <Button variant="ghost" asChild>
                <Link href="/landlord-dashboard">
                    ← Back to Dashboard
                </Link>
            </Button>

            {/* Header */}
            <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                <div>
                    <p className="text-sm font-medium text-primary">
                        Landlord Dashboard
                    </p>

                    <h1 className="mt-1 text-3xl font-bold">
                        My Properties
                    </h1>

                    <p className="mt-2 text-muted-foreground">
                        Manage your rental properties from one place.
                    </p>
                </div>
            </div>

            {/* Property Count */}
            <div className="text-sm text-muted-foreground">
                {properties.length}{" "}
                {properties.length === 1
                    ? "property"
                    : "properties"}{" "}
                listed
            </div>

            {/* Property Grid */}
            {properties.length > 0 ? (
                <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
                    {properties.map((property: IProperty) => (
                        <LandlordPropertyCard
                            key={property.id}
                            property={property}
                            categories={categories}
                        />
                    ))}
                </div>
            ) : (
                <PropertyEmpty />
            )}

        </div>
    );
}