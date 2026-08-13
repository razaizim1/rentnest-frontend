import Image from "next/image";
import Link from "next/link";
import {
    Bath,
    BedDouble,
    MapPin,
    Pencil,
    Trash2,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

import { IProperty } from "@/lib/types";
import { DeletePropertyButton } from "./DeletePropertyButton";

type LandlordPropertyCardProps = {
    property: IProperty;
};

export function LandlordPropertyCard({
    property,
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

                <div className="flex gap-2">
                    <Button
                        variant="outline"
                        className="flex-1"
                        asChild
                    >
                        <Link
                            href={`/landlord-dashboard/properties/${property.id}/edit`}
                        >
                            <Pencil className="mr-2 h-4 w-4" />
                            Edit
                        </Link>
                    </Button>

                    <DeletePropertyButton
                        propertyId={property.id}
                    />
                </div>
            </CardContent>
        </Card>
    );
}