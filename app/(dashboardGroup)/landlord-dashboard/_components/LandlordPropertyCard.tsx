import { EditPropertyDialog } from "./EditPropertyDialog";
import Image from "next/image";
import {
    Bath,
    BedDouble,
    MapPin,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

import { IProperty } from "@/lib/types";
import { DeletePropertyButton } from "./DeletePropertyButton";
import { AvailabilityToggle } from "./AvailabilityToggle";

type LandlordPropertyCardProps = {
    property: IProperty;
    categories: {
        id: string;
        name: string;
    }[];
};

export function LandlordPropertyCard({
    property,
    categories,
}: LandlordPropertyCardProps) {
    return (
        <Card className="overflow-hidden rounded-2xl">
            <div className="relative">
                <Image
                    src={property.image}
                    alt={property.title}
                    width={600}
                    height={400}
                    className="h-56 w-full object-cover"
                />

                <Badge
                    className={`absolute right-4 top-4 ${property.available
                        ? "bg-green-600 text-white"
                        : "bg-red-600 text-white"
                        }`}
                >
                    {property.available
                        ? "Available"
                        : "Unavailable"}
                </Badge>
            </div>

            <CardContent className="space-y-5 p-5">
                <div>
                    <div className="mb-2 flex items-center justify-between gap-3">
                        <Badge variant="outline">
                            {property.category.name}
                        </Badge>
                    </div>

                    <h2 className="text-xl font-semibold">
                        {property.title}
                    </h2>

                    <div className="mt-2 flex items-center gap-2 text-sm text-muted-foreground">
                        <MapPin size={16} />
                        {property.location}
                    </div>
                </div>

                <div className="flex items-center justify-between">
                    <p className="text-2xl font-bold text-primary">
                        ৳ {property.rentAmount.toLocaleString()}
                        <span className="text-sm font-normal text-muted-foreground">
                            {" "}
                            / month
                        </span>
                    </p>
                </div>

                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                        <BedDouble size={16} />
                        {property.bedrooms}
                    </div>

                    <div className="flex items-center gap-1">
                        <Bath size={16} />
                        {property.bathrooms}
                    </div>

                    <span>
                        {property.area} sqft
                    </span>
                </div>

                <div className="flex flex-col gap-2">
                    <AvailabilityToggle
                        propertyId={property.id}
                        available={property.available}
                    />
                    <div className="flex gap-2">
                    <EditPropertyDialog
                        property={property}
                        categories={categories}
                    />

                    <DeletePropertyButton
                        propertyId={property.id}
                    />
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}