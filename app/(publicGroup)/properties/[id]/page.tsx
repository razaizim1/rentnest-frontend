import Image from "next/image";
import Link from "next/link";
import {
    Bath,
    BedDouble,
    Building2,
    Check,
    Mail,
    MapPin,
    Maximize,
    Phone,
    User,
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
import { PropertyGallery } from "../../_components/property/PropertyGallery";
import { PayButton } from "../../_components/payment/PayButton";

export default async function PropertyDetailsPage({
    params,
}: ParamsWithId) {
    const { id } = await params;

    const result = await getProperty(id);

    if (!result?.data) {
        notFound();
    }

    const property = result.data;
    const userResult = await getMe();
    const user = userResult?.data;

    let hasRequested = false;
    let status: string | null = null;
    let rentalRequestId: string | null = null;

    if (user) {
        const rentalStatus = await checkRentalStatus(id);

        hasRequested = rentalStatus?.data?.hasRequested ?? false;
        status = rentalStatus?.data?.status ?? null;
        rentalRequestId = rentalStatus?.data?.rentalRequestId ?? null;
    }

    return (
        <main className="min-h-screen bg-muted/20">
            <div className="container mx-auto px-4 py-8 sm:py-10">
                <div className="mb-6">
                    <Button variant="ghost" asChild className="-ml-2">
                        <Link href="/properties">
                            ← Back to Properties
                        </Link>
                    </Button>
                </div>

                <PropertyGallery
                    image={property.image}
                    title={property.title}
                    category={property.category?.name}
                    available={property.available}
                />

                <section className="mt-8 overflow-hidden rounded-3xl border bg-background shadow-sm">
                    <div className="grid gap-8 p-6 sm:p-8 lg:grid-cols-[1.4fr_0.8fr] lg:p-10">
                        <div>
                            <div className="flex flex-wrap items-center gap-2">
                                <Badge variant="secondary">
                                    {property.category.name}
                                </Badge>
                                <Badge
                                    className={
                                        property.available
                                            ? "bg-green-600 text-white hover:bg-green-600"
                                            : "bg-red-600 text-white hover:bg-red-600"
                                    }
                                >
                                    {property.available ? "Available" : "Rented"}
                                </Badge>
                            </div>

                            <h1 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
                                {property.title}
                            </h1>

                            <div className="mt-3 flex items-center gap-2 text-muted-foreground">
                                <MapPin size={18} className="shrink-0" />
                                <span>
                                    {property.address
                                        ? `${property.address}, ${property.location}`
                                        : property.location}
                                </span>
                            </div>

                            <div className="mt-6">
                                <p className="text-sm text-muted-foreground">
                                    Monthly Rent
                                </p>
                                <h2 className="mt-1 text-3xl font-bold text-primary sm:text-4xl">
                                    ৳ {property.rentAmount.toLocaleString()}
                                    <span className="ml-1 text-base font-normal text-muted-foreground">
                                        / month
                                    </span>
                                </h2>
                            </div>

                            <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
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

                            <div className="mt-8">
                                <h3 className="text-lg font-semibold">
                                    About this property
                                </h3>
                                <p className="mt-3 leading-7 text-muted-foreground">
                                    {property.description}
                                </p>
                            </div>

                            <div className="mt-8">
                                <h3 className="text-lg font-semibold">Amenities</h3>
                                {property.amenities?.length > 0 ? (
                                    <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3">
                                        {property.amenities.map((item: string) => (
                                            <div
                                                key={item}
                                                className="flex items-center gap-2 text-sm text-muted-foreground"
                                            >
                                                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-green-100 text-green-600">
                                                    <Check size={15} />
                                                </span>
                                                <span>{item}</span>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <p className="mt-3 text-sm text-muted-foreground">
                                        No amenities listed.
                                    </p>
                                )}
                            </div>
                        </div>

                        <div className="space-y-6">
                            <Card className="rounded-2xl shadow-none">
                                <CardContent className="space-y-4 p-6">
                                    <h3 className="text-lg font-semibold">Landlord</h3>
                                    <div className="flex items-center gap-3">
                                        <div className="flex h-12 w-12 items-center justify-center overflow-hidden rounded-full bg-primary/10 text-primary">
                                            {property.landlord?.avatar ? (
                                                <Image
                                                    src={property.landlord.avatar}
                                                    alt={property.landlord.name}
                                                    width={48}
                                                    height={48}
                                                    className="h-full w-full object-cover"
                                                />
                                            ) : (
                                                <User size={20} />
                                            )}
                                        </div>
                                        <div>
                                            <p className="font-semibold">
                                                {property.landlord?.name || "Property owner"}
                                            </p>
                                            <p className="text-sm text-muted-foreground">
                                                Verified landlord
                                            </p>
                                        </div>
                                    </div>
                                    {property.landlord?.email && (
                                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                            <Mail size={16} />
                                            {property.landlord.email}
                                        </div>
                                    )}
                                    {property.landlord?.phone && (
                                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                            <Phone size={16} />
                                            {property.landlord.phone}
                                        </div>
                                    )}
                                </CardContent>
                            </Card>

                            <Card className="rounded-2xl shadow-none">
                                <CardContent className="space-y-4 p-6">
                                    <h3 className="text-lg font-semibold">
                                        Request this rental
                                    </h3>

                                    {!property.available &&
                                        status !== "APPROVED" &&
                                        status !== "ACTIVE" &&
                                        status !== "COMPLETED" && (
                                            <p className="rounded-xl border bg-muted/40 p-4 text-sm text-muted-foreground">
                                                This property is currently rented.
                                                You can still read reviews below.
                                            </p>
                                        )}

                                    {!user && property.available && (
                                        <Button asChild className="h-12 w-full rounded-xl text-base">
                                            <Link href="/login">Login to Request</Link>
                                        </Button>
                                    )}

                                    {user?.role === "TENANT" &&
                                        !hasRequested &&
                                        property.available && (
                                            <Button asChild className="h-12 w-full rounded-xl text-base">
                                                <Link href={`/properties/${id}/rent`}>
                                                    Request to Rent
                                                </Link>
                                            </Button>
                                        )}

                                    {user?.role === "TENANT" &&
                                        hasRequested &&
                                        status === "PENDING" && (
                                            <Button disabled className="h-12 w-full rounded-xl">
                                                Request Sent
                                            </Button>
                                        )}

                                    {user?.role === "TENANT" &&
                                        hasRequested &&
                                        status === "APPROVED" &&
                                        rentalRequestId && (
                                            <div className="space-y-3">
                                                <p className="text-sm text-muted-foreground">
                                                    Your request was approved. Complete payment to confirm the rental.
                                                </p>
                                                <PayButton rentalRequestId={rentalRequestId} />
                                            </div>
                                        )}

                                    {user?.role === "TENANT" &&
                                        hasRequested &&
                                        status === "REJECTED" &&
                                        property.available && (
                                            <Button asChild className="h-12 w-full rounded-xl text-base">
                                                <Link href={`/properties/${id}/rent`}>
                                                    Request Again
                                                </Link>
                                            </Button>
                                        )}

                                    {user?.role === "TENANT" &&
                                        (status === "ACTIVE" || status === "COMPLETED") && (
                                            <p className="text-sm text-muted-foreground">
                                                You already rented this property. Share a review below if you have not already.
                                            </p>
                                        )}

                                    {user && user.role !== "TENANT" && (
                                        <p className="text-sm text-muted-foreground">
                                            Only tenant accounts can submit rental requests.
                                        </p>
                                    )}
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </section>

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
                    <p className="text-xs text-muted-foreground">{label}</p>
                    <p className="mt-1 truncate font-semibold">{value}</p>
                </div>
            </CardContent>
        </Card>
    );
}
