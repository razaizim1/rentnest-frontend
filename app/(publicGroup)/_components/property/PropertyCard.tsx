
import { IProperty } from "@/lib/types";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { MapPin,BedDouble,Bath,Maximize } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";

export const PropertyCard = ({
    property,
}: {
    property: IProperty;
}) => {
    return (
        <Card className="overflow-hidden rounded-2xl transition hover:-translate-y-1 hover:shadow-xl">

            <div className="relative">

                <Image
                    src={property.image}
                    alt={property.title}
                    width={600}
                    height={400}
                    className="h-60 w-full object-cover"
                />

                <Badge className="absolute left-4 top-4">
                    {property.category.name}
                </Badge>

                <Badge
                    className={`absolute right-4 top-4 ${
                        property.available
                            ? "bg-green-600 text-white hover:bg-green-600"
                            : "bg-red-600 text-white hover:bg-red-600"
                    }`}
                >
                    {property.available ? "Available" : "Rented"}
                </Badge>

            </div>

            <CardContent className="space-y-5 p-5">

                <div>

                    <h2 className="text-xl font-semibold">
                        {property.title}
                    </h2>

                    <div className="mt-2 flex items-center gap-2 text-muted-foreground">
                        <MapPin size={16} />
                        {property.location}
                    </div>

                </div>

                <div>

                    <h3 className="text-2xl font-bold text-primary">
                        ৳ {property.rentAmount.toLocaleString()}
                        <span className="text-base font-normal text-muted-foreground">
                            {" "}
                            / month
                        </span>
                    </h3>

                </div>

                <div className="flex items-center justify-between text-sm">

                    <div className="flex items-center gap-1">
                        <BedDouble size={18} />
                        {property.bedrooms}
                    </div>

                    <div className="flex items-center gap-1">
                        <Bath size={18} />
                        {property.bathrooms}
                    </div>

                    <div className="flex items-center gap-1">
                        <Maximize size={18} />
                        {property.area} sqft
                    </div>

                </div>

                {property.amenities?.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                        {property.amenities.slice(0, 3).map((item) => (
                            <Badge key={item} variant="outline">
                                {item}
                            </Badge>
                        ))}
                    </div>
                )}

                <Button
                    className="w-full"
                    asChild
                    variant={property.available ? "default" : "outline"}
                >
                    <Link href={`/properties/${property.id}`}>
                        {property.available ? "View Details" : "View Details & Reviews"}
                    </Link>
                </Button>

            </CardContent>
        </Card>
    );
};