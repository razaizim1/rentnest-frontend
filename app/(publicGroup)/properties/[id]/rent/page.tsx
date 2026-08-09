import Link from "next/link";
import Image from "next/image";

import { getProperty } from "../../../_actions/getProperty";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ParamsWithId } from "@/lib/types";
import RentalRequestForm from "@/app/(publicGroup)/_components/rental/RentalRequestForm";
import { MapPinIcon } from "lucide-react";



export default async function RentRequestPage({
    params,
}: ParamsWithId) {

    const { id } = await params;

    const result = await getProperty(id);

    const property = result.data;

    return (
        <div className="container mx-auto max-w-6xl px-4 py-10">

            <Button
                variant="ghost"
                asChild
                className="mb-8"
            >
                <Link href={`/properties/${id}`}>
                    ← Back to Property
                </Link>
            </Button>

            <div className="grid gap-8 lg:grid-cols-2">

                {/* Property Info */}

                <Card>

                    <Image
                        src={property.image}
                        alt={property.title}
                        width={700}
                        height={500}
                        className="h-72 w-full rounded-t-xl object-cover"
                    />

                    <CardContent className="space-y-5 p-6">

                        <h2 className="text-2xl font-bold">
                            {property.title}
                        </h2>

                        <div className="flex items-center gap-2 text-muted-foreground">
                            <MapPinIcon size={18} />
                            {property.location}
                        </div>

                        <h3 className="text-3xl font-bold text-primary">
                            ৳ {property.rentAmount.toLocaleString()}

                            <span className="text-base font-normal text-muted-foreground">
                                {" "}
                                / month
                            </span>

                        </h3>

                    </CardContent>

                </Card>

                {/* Rental Form */}

                <Card>

                    <CardContent className="space-y-6 p-6">

                        <div>

                            <h2 className="text-3xl font-bold">
                                Request Rental
                            </h2>

                            <p className="mt-2 text-muted-foreground">
                                Fill out the form below to request this property.
                            </p>

                        </div>

                        <RentalRequestForm propertyId={property.id} />
                    </CardContent>

                </Card>

            </div>

        </div>
    );
}