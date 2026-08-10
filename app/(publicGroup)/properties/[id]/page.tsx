import Image from "next/image";
import Link from "next/link";
import {
    Bath,
    BedDouble,
    Building2,
    Check,
    MapPin,
    Maximize,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

import { getProperty } from "../../_actions/getProperty";
import { ParamsWithId } from "@/lib/types";
import { getMe } from "@/service/getMe";
import { checkRentalStatus } from "@/app/(dashboardGroup)/dashboard/_actions/checkRentalStatus";



export default async function PropertyDetailsPage({
    params,
}: ParamsWithId) {

    const { id } = await params;
    const result = await getProperty(id);
    const property = result?.data;
    const userResult = await getMe();
    const user = userResult?.data;
    const rentalStatus = await checkRentalStatus(id);
    let hasRequested = false;
    let status = null;

    if (user) {
        const rentalStatus = await checkRentalStatus(id);

        hasRequested = rentalStatus?.data?.hasRequested ?? false;
        status = rentalStatus?.data?.status ?? null;
    }

    return (
        <div className="container mx-auto py-10">

            <Button
                variant="ghost"
                asChild
                className="mb-8"
            >
                <Link href="/properties">
                    ← Back to Properties
                </Link>
            </Button>

            <div className="grid gap-10 lg:grid-cols-2">

                {/* Image */}

                <div>

                    <Image
                        src={property.image}
                        alt={property.title}
                        width={900}
                        height={700}
                        className="h-[500px] w-full rounded-2xl object-cover"
                    />

                </div>

                {/* Details */}

                <div className="space-y-6">

                    <div>

                        <Badge>
                            {property.category.name}
                        </Badge>

                        <h1 className="mt-4 text-4xl font-bold">
                            {property.title}
                        </h1>

                        <div className="mt-3 flex items-center gap-2 text-muted-foreground">
                            <MapPin size={18} />
                            {property.location}
                        </div>

                    </div>

                    <div>

                        <h2 className="text-3xl font-bold text-primary">
                            ৳ {property.rentAmount.toLocaleString()}

                            <span className="text-lg font-normal text-muted-foreground">
                                {" "}
                                / month
                            </span>

                        </h2>

                    </div>

                    <div className="grid grid-cols-2 gap-4">

                        <Card>

                            <CardContent className="flex items-center gap-3 p-5">

                                <BedDouble />

                                <div>

                                    <p className="text-sm text-muted-foreground">
                                        Bedrooms
                                    </p>

                                    <h4 className="font-semibold">
                                        {property.bedrooms}
                                    </h4>

                                </div>

                            </CardContent>

                        </Card>

                        <Card>

                            <CardContent className="flex items-center gap-3 p-5">

                                <Bath />

                                <div>

                                    <p className="text-sm text-muted-foreground">
                                        Bathrooms
                                    </p>

                                    <h4 className="font-semibold">
                                        {property.bathrooms}
                                    </h4>

                                </div>

                            </CardContent>

                        </Card>

                        <Card>

                            <CardContent className="flex items-center gap-3 p-5">

                                <Maximize />

                                <div>

                                    <p className="text-sm text-muted-foreground">
                                        Area
                                    </p>

                                    <h4 className="font-semibold">
                                        {property.area} sqft
                                    </h4>

                                </div>

                            </CardContent>

                        </Card>

                        <Card>

                            <CardContent className="flex items-center gap-3 p-5">

                                <Building2 />

                                <div>

                                    <p className="text-sm text-muted-foreground">
                                        Type
                                    </p>

                                    <h4 className="font-semibold">
                                        {property.category.name}
                                    </h4>

                                </div>

                            </CardContent>

                        </Card>

                    </div>

                    <Card>

                        <CardHeader>

                            <CardTitle>
                                Description
                            </CardTitle>

                        </CardHeader>

                        <CardContent>

                            <p className="leading-7 text-muted-foreground">
                                {property.description}
                            </p>

                        </CardContent>

                    </Card>

                    <Card>

                        <CardHeader>

                            <CardTitle>
                                Amenities
                            </CardTitle>

                        </CardHeader>

                        <CardContent>

                            <div className="grid grid-cols-2 gap-3">

                                {property.amenities.map(
                                    (item: string) => (
                                        <div
                                            key={item}
                                            className="flex items-center gap-2"
                                        >
                                            <Check
                                                size={18}
                                                className="text-green-600"
                                            />

                                            {item}

                                        </div>
                                    )
                                )}

                            </div>

                        </CardContent>

                    </Card>

                    {/* User not logged in */}
                    {!user && (
                        <Button asChild className="w-full">
                            <Link href="/login">
                                Login to Request
                            </Link>
                        </Button>
                    )}

                    {/* Tenant can request */}
                    {user?.role === "TENANT" && !hasRequested && (
                        <Button asChild className="w-full">
                            <Link href={`/properties/${id}/rent`}>
                                Request Rental
                            </Link>
                        </Button>
                    )}

                    {/* Request Pending */}
                    {user?.role === "TENANT" &&
                        hasRequested &&
                        status === "PENDING" && (
                            <Button disabled className="w-full">
                                Request Sent
                            </Button>
                        )}

                    {/* Approved */}
                    {user?.role === "TENANT" &&
                        hasRequested &&
                        status === "APPROVED" && (
                            <Button disabled className="w-full">
                                Rental Approved
                            </Button>
                        )}

                    {/* Rejected */}
                    {user?.role === "TENANT" &&
                        hasRequested &&
                        status === "REJECTED" && (
                            <Button asChild className="w-full">
                                <Link href={`/properties/${id}/rent`}>
                                    Request Again
                                </Link>
                            </Button>
                        )}

                </div>

            </div>

        </div>
    );
}