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
import { notFound } from "next/navigation";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
} from "@/components/ui/card";

import { getProperty } from "../../_actions/getProperty";
import { ParamsWithId } from "@/lib/types";
import { getMe } from "@/service/getMe";
import { checkRentalStatus } from "@/app/(dashboardGroup)/dashboard/_actions/checkRentalStatus";
import { ReviewSection } from "../../_components/property/ReviewSection";

export default async function PropertyDetailsPage({
    params,
}: ParamsWithId) {
    const { id } = await params;

    // Property
    const result = await getProperty(id);

    if (!result?.data) {
        notFound();
    }

    const property = result.data;

    // Current user
    const userResult = await getMe();
    const user = userResult?.data;

    // Rental status only for logged-in user
    let hasRequested = false;
    let status: string | null = null;

    if (user) {
        const rentalStatus = await checkRentalStatus(id);

        hasRequested =
            rentalStatus?.data?.hasRequested ?? false;

        status =
            rentalStatus?.data?.status ?? null;
    }

    return (
        <main className="min-h-screen bg-muted/20">
            <div className="container mx-auto px-4 py-8 sm:py-10">

                {/* Back */}
                <div className="mb-6">
                    <Button
                        variant="ghost"
                        asChild
                        className="-ml-2"
                    >
                        <Link href="/dashboard">
                            ← Back to Dashboard
                        </Link>
                    </Button>
                </div>

                {/* Main Property Section */}
                <section className="overflow-hidden rounded-3xl border bg-background shadow-sm">
                    <div className="grid lg:grid-cols-2">

                        {/* Image */}
                        <div className="relative min-h-[320px] lg:min-h-[680px]">
                            <Image
                                src={property.image}
                                alt={property.title}
                                fill
                                priority
                                sizes="(max-width: 1024px) 100vw, 50vw"
                                className="object-cover"
                            />

                            {/* Overlay */}
                            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent p-6 lg:p-8">
                                <Badge className="border-0 bg-white/95 text-foreground hover:bg-white/95">
                                    {property.category.name}
                                </Badge>
                            </div>
                        </div>

                        {/* Details */}
                        <div className="flex flex-col p-6 sm:p-8 lg:p-10">

                            {/* Header */}
                            <div>
                                <Badge variant="secondary">
                                    {property.category.name}
                                </Badge>

                                <h1 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
                                    {property.title}
                                </h1>

                                <div className="mt-3 flex items-center gap-2 text-muted-foreground">
                                    <MapPin
                                        size={18}
                                        className="shrink-0"
                                    />
                                    <span>
                                        {property.location}
                                    </span>
                                </div>

                                <div className="mt-6">
                                    <p className="text-sm text-muted-foreground">
                                        Monthly Rent
                                    </p>

                                    <h2 className="mt-1 text-3xl font-bold text-primary sm:text-4xl">
                                        ৳{" "}
                                        {property.rentAmount.toLocaleString()}

                                        <span className="ml-1 text-base font-normal text-muted-foreground">
                                            / month
                                        </span>
                                    </h2>
                                </div>
                            </div>

                            {/* Features */}
                            <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4">
                                <FeatureCard
                                    icon={<BedDouble />}
                                    label="Bedrooms"
                                    value={property.bedrooms}
                                />

                                <FeatureCard
                                    icon={<Bath />}
                                    label="Bathrooms"
                                    value={property.bathrooms}
                                />

                                <FeatureCard
                                    icon={<Maximize />}
                                    label="Area"
                                    value={`${property.area} sqft`}
                                />

                                <FeatureCard
                                    icon={<Building2 />}
                                    label="Type"
                                    value={property.category.name}
                                />
                            </div>

                            {/* Description */}
                            <div className="mt-8">
                                <h3 className="text-lg font-semibold">
                                    About this property
                                </h3>

                                <p className="mt-3 leading-7 text-muted-foreground">
                                    {property.description}
                                </p>
                            </div>

                            {/* Amenities */}
                            <div className="mt-8">
                                <h3 className="text-lg font-semibold">
                                    Amenities
                                </h3>

                                {property.amenities?.length > 0 ? (
                                    <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3">
                                        {property.amenities.map(
                                            (item: string) => (
                                                <div
                                                    key={item}
                                                    className="flex items-center gap-2 text-sm text-muted-foreground"
                                                >
                                                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-green-100 text-green-600">
                                                        <Check size={15} />
                                                    </span>

                                                    <span>{item}</span>
                                                </div>
                                            )
                                        )}
                                    </div>
                                ) : (
                                    <p className="mt-3 text-sm text-muted-foreground">
                                        No amenities listed.
                                    </p>
                                )}
                            </div>

                            {/* Rental Action */}
                            <div className="mt-auto pt-8">

                                {/* Logged out */}
                                {!user && (
                                    <Button
                                        asChild
                                        className="h-12 w-full rounded-xl text-base"
                                    >
                                        <Link href="/login">
                                            Login to Request
                                        </Link>
                                    </Button>
                                )}

                                {/* Tenant can request */}
                                {user?.role === "TENANT" &&
                                    !hasRequested && (
                                        <Button
                                            asChild
                                            className="h-12 w-full rounded-xl text-base"
                                        >
                                            <Link
                                                href={`/properties/${id}/rent`}
                                            >
                                                Request Rental
                                            </Link>
                                        </Button>
                                    )}

                                {/* Pending */}
                                {user?.role === "TENANT" &&
                                    hasRequested &&
                                    status === "PENDING" && (
                                        <Button
                                            disabled
                                            className="h-12 w-full rounded-xl"
                                        >
                                            Request Sent
                                        </Button>
                                    )}

                                {/* Approved */}
                                {user?.role === "TENANT" &&
                                    hasRequested &&
                                    status === "APPROVED" && (
                                        <Button
                                            disabled
                                            className="h-12 w-full rounded-xl"
                                        >
                                            Rental Approved
                                        </Button>
                                    )}

                                {/* Rejected */}
                                {user?.role === "TENANT" &&
                                    hasRequested &&
                                    status === "REJECTED" && (
                                        <Button
                                            asChild
                                            className="h-12 w-full rounded-xl text-base"
                                        >
                                            <Link
                                                href={`/properties/${id}/rent`}
                                            >
                                                Request Again
                                            </Link>
                                        </Button>
                                    )}
                            </div>
                        </div>
                    </div>
                </section>

                {/* Reviews - FULL WIDTH */}
                <section className="mt-10 rounded-3xl border bg-background p-6 shadow-sm sm:p-8">
                    <ReviewSection
                        propertyId={id}
                        currentUser={user}
                        hasRequested={hasRequested}
                        rentalStatus={status}
                    />
                </section>
            </div>
        </main>
    );
}

type FeatureCardProps = {
    icon: React.ReactNode;
    label: string;
    value: string | number;
};

function FeatureCard({
    icon,
    label,
    value,
}: FeatureCardProps) {
    return (
        <Card className="rounded-2xl shadow-none">
            <CardContent className="flex items-center gap-3 p-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    {icon}
                </div>

                <div className="min-w-0">
                    <p className="text-xs text-muted-foreground">
                        {label}
                    </p>

                    <p className="mt-1 truncate font-semibold">
                        {value}
                    </p>
                </div>
            </CardContent>
        </Card>
    );
}