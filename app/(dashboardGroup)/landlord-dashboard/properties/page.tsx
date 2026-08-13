import Link from "next/link";
import { Plus } from "lucide-react";

import { Button } from "@/components/ui/button";

import { getMyProperties } from "../_actions/getMyProperties";
import { LandlordPropertyCard } from "../_components/LandlordPropertyCard";
import { PropertyEmpty } from "../_components/PropertyEmpty";
import { IProperty } from "@/lib/types";

export default async function MyPropertiesPage() {
    const result = await getMyProperties();

    const properties = result?.data ?? [];

    return (
        <div className="space-y-8">

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

                <Button asChild>
                    <Link href="/landlord-dashboard/properties/new">
                        <Plus className="mr-2 h-4 w-4" />
                        Add Property
                    </Link>
                </Button>
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
                        />
                    ))}
                </div>
            ) : (
                <PropertyEmpty />
            )}

        </div>
    );
}