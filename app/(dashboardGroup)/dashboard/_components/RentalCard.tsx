import Image from "next/image";
import Link from "next/link";
import { CalendarDays, MapPin } from "lucide-react";
import { format } from "date-fns";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

import { IRental } from "@/lib/types";

type RentalCardProps = {
    rental: IRental;
};

export default function RentalCard({
    rental,
}: RentalCardProps) {

    const property = rental.property;

    return (
        <Card className="overflow-hidden">


            <div className="relative">

                <Image
                    src={property.image}
                    alt={property.title}
                    width={600}
                    height={400}
                    className="h-56 w-full object-cover"
                />

                <Badge
                    className={`absolute right-4 top-4 border ${rental.status === "APPROVED"
                        ? "border-green-300 bg-green-100 text-green-700"
                        : rental.status === "PENDING"
                            ? "border-yellow-300 bg-yellow-100 text-yellow-700"
                            : "border-red-300 bg-red-100 text-red-700"
                        }`}
                >
                    {rental.status.charAt(0) + rental.status.slice(1).toLowerCase()}
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

                <h3 className="text-2xl font-bold text-primary">
                    ৳ {property.rentAmount.toLocaleString()}
                    <span className="text-base font-normal text-muted-foreground">
                        {" "}
                        / month
                    </span>
                </h3>

                <div className="flex items-center gap-2 text-sm text-muted-foreground">

                    <CalendarDays size={16} />

                    <span>
                        Move In:{" "}
                        {format(
                            new Date(rental.moveInDate),
                            "dd MMM yyyy"
                        )}
                    </span>

                </div>

                <div className="flex gap-3">

                    <Button
                        variant="outline"
                        className="flex-1"
                        asChild
                    >
                        <Link href={`/properties/${property.id}`}>
                            View Property
                        </Link>
                    </Button>

                    {rental.status === "APPROVED" && (
                        <Button className="flex-1">
                            Pay Now
                        </Button>
                    )}

                </div>

            </CardContent>

        </Card>
    );
}