import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Building2, CheckCircle2, Home, ShieldCheck, Star, Users, Wallet } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { PropertyCard } from "./_components/property/PropertyCard";
import { PropertyEmpty } from "./_components/property/PropertyEmpty";

import { getProperties } from "./_actions/getProperties";
import { IProperty } from "@/lib/types";

export default async function HomePage() {
    // Fetch featured properties for the landing page
    const result = await getProperties({ page: "1", limit: "6" });
    const featuredProperties: IProperty[] =
        (result.data?.data ?? []).slice(0, 6);

    const stats = [
        {
            label: "Verified Properties",
            value: "1,200+",
            icon: Building2,
        },
        {
            label: "Happy Tenants",
            value: "3,500+",
            icon: Users,
        },
        {
            label: "Trusted Landlords",
            value: "850+",
            icon: ShieldCheck,
        },
        {
            label: "Rent Collected",
            value: "৳12Cr+",
            icon: Wallet,
        },
    ];

    const steps = [
        {
            step: "01",
            title: "Browse Properties",
            description:
                "Search through our carefully curated listings with advanced filters to find your perfect home.",
            icon: Home,
        },
        {
            step: "02",
            title: "Submit a Request",
            description:
                "Like a property? Send a rental request with your move-in date and a message to the landlord.",
            icon: Users,
        },
        {
            step: "03",
            title: "Get Approved & Pay",
            description:
                "Once the landlord approves, complete a secure Stripe checkout and move into your new home.",
            icon: Wallet,
        },
    ];

    const testimonials = [
        {
            name: "Ariful Islam",
            role: "Tenant",
            avatar: "https://i.pravatar.cc/100?img=12",
            rating: 5,
            text: "Found my apartment in Dhanmondi in less than a week. The whole process from request to payment was unbelievably smooth!",
        },
        {
            name: "Tasnim Rahman",
            role: "Landlord",
            avatar: "https://i.pravatar.cc/100?img=47",
            rating: 5,
            text: "As a landlord, RentNest made tenant screening and rent collection completely hassle-free. Highly recommended.",
        },
        {
            name: "Riad Hossain",
            role: "Tenant",
            avatar: "https://i.pravatar.cc/100?img=33",
            rating: 4,
            text: "Love the modern UI and the instant status updates on my rental requests. Payment via Stripe feels very secure.",
        },
    ];

    return (
        <div className="flex flex-col gap-24 pb-24">
            {/* ========================= HERO ========================= */}
            <section className="relative overflow-hidden border-b">
                {/* Soft gradient background */}
                <div className="absolute inset-0 -z-10 bg-linear-to-br from-primary/5 via-background to-primary/10" />
                <div className="absolute -right-32 -top-32 -z-10 h-[480px] w-[480px] rounded-full bg-primary/10 blur-3xl" />
                <div className="absolute -bottom-40 -left-24 -z-10 h-[420px] w-[420px] rounded-full bg-blue-400/10 blur-3xl" />

                <div className="container mx-auto grid items-center gap-12 px-4 py-20 lg:grid-cols-2 lg:py-28">
                    {/* Left */}
                    <div>
                        <Badge
                            variant="outline"
                            className="mb-6 gap-2 border-primary/20 bg-primary/5 px-3 py-1 text-primary"
                        >
                            <CheckCircle2 size={14} />
                            Bangladeshs #1 Trusted Rental Marketplace
                        </Badge>

                        <h1 className="text-4xl font-bold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
                            Find Your Perfect
                            {" "}
                            <span className="bg-linear-to-r from-primary to-blue-500 bg-clip-text text-transparent">
                                Rental Home
                            </span>
                        </h1>

                        <p className="mt-6 max-w-xl text-lg leading-8 text-muted-foreground">
                            Browse hundreds of verified apartments, houses and villas.
                            Talk to landlords, request a rental and pay securely — all in
                            one beautifully designed platform.
                        </p>

                        {/* Fake search bar (CTA to browse) */}
                        <div className="mt-8 flex flex-col gap-3 rounded-2xl border bg-background p-3 shadow-lg sm:flex-row sm:items-center">
                            <Input
                                className="h-12 border-0 shadow-none focus-visible:ring-0"
                                placeholder="Search by location, e.g. Dhanmondi, Gulshan..."
                                readOnly
                            />
                            <Button asChild size="lg" className="h-12 sm:w-auto">
                                <Link href="/properties">
                                    Browse Properties
                                    <ArrowRight size={18} />
                                </Link>
                            </Button>
                        </div>

                        {/* Quick links */}
                        <div className="mt-8 flex flex-wrap items-center gap-6 text-sm text-muted-foreground">
                            <div className="flex items-center gap-2">
                                <CheckCircle2
                                    size={16}
                                    className="text-green-600"
                                />
                                100% Verified Listings
                            </div>
                            <div className="flex items-center gap-2">
                                <CheckCircle2
                                    size={16}
                                    className="text-green-600"
                                />
                                Secure Stripe Payments
                            </div>
                            <div className="flex items-center gap-2">
                                <CheckCircle2
                                    size={16}
                                    className="text-green-600"
                                />
                                24/7 Support
                            </div>
                        </div>
                    </div>

                    {/* Right: Image collage */}
                    <div className="relative">
                        <div className="relative mx-auto aspect-[4/5] w-full max-w-md">
                            <div className="absolute right-0 top-0 h-2/3 w-3/4 overflow-hidden rounded-3xl border shadow-2xl">
                                <Image
                                    src="https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=900&auto=format&fit=crop&q=80"
                                    alt="Modern apartment"
                                    fill
                                    className="object-cover"
                                    sizes="(max-width: 1024px) 80vw, 40vw"
                                    priority
                                />
                            </div>
                            <div className="absolute bottom-0 left-0 h-2/3 w-3/5 overflow-hidden rounded-3xl border shadow-2xl">
                                <Image
                                    src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&auto=format&fit=crop&q=80"
                                    alt="Cozy home"
                                    fill
                                    className="object-cover"
                                    sizes="(max-width: 1024px) 60vw, 30vw"
                                />
                            </div>
                            {/* Floating stat card */}
                            <div className="absolute -left-6 top-10 rounded-2xl border bg-background/95 p-4 shadow-xl backdrop-blur">
                                <div className="flex items-center gap-3">
                                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-green-100 text-green-700">
                                        <CheckCircle2 size={22} />
                                    </div>
                                    <div>
                                        <p className="text-xs text-muted-foreground">
                                            Approved this week
                                        </p>
                                        <p className="text-lg font-bold">
                                            312 rentals
                                        </p>
                                    </div>
                                </div>
                            </div>
                            {/* Floating rating card */}
                            <div className="absolute -right-4 bottom-14 rounded-2xl border bg-background/95 p-4 shadow-xl backdrop-blur">
                                <div className="flex items-center gap-3">
                                    <div className="flex -space-x-2">
                                        {[5, 20, 8].map((img) => (
                                            <Image
                                                key={img}
                                                src={`https://i.pravatar.cc/36?img=${img}`}
                                                className="h-9 w-9 rounded-full border-2 border-background"
                                                alt="user"
                                                width={36}
                                                height={36}
                                            />
                                        ))}
                                    </div>
                                    <div>
                                        <div className="flex items-center gap-1 text-amber-500">
                                            {[1, 2, 3, 4, 5].map((i) => (
                                                <Star
                                                    key={i}
                                                    size={14}
                                                    fill="currentColor"
                                                />
                                            ))}
                                        </div>
                                        <p className="text-xs text-muted-foreground">
                                            4.9 / 5 from 2,300+ users
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ========================= STATS ========================= */}
            <section className="container mx-auto px-4">
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                    {stats.map((stat) => {
                        const Icon = stat.icon;
                        return (
                            <Card
                                key={stat.label}
                                className="border shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
                            >
                                <CardContent className="flex items-center gap-4 p-6">
                                    <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                                        <Icon size={26} />
                                    </div>
                                    <div>
                                        <p className="text-3xl font-bold">
                                            {stat.value}
                                        </p>
                                        <p className="text-sm text-muted-foreground">
                                            {stat.label}
                                        </p>
                                    </div>
                                </CardContent>
                            </Card>
                        );
                    })}
                </div>
            </section>

            {/* ========================= FEATURED PROPERTIES ========================= */}
            <section className="container mx-auto px-4">
                <div className="mb-12 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
                    <div>
                        <Badge
                            variant="outline"
                            className="mb-3 border-primary/20 bg-primary/5 text-primary"
                        >
                            Featured Listings
                        </Badge>
                        <h2 className="text-3xl font-bold sm:text-4xl">
                            Hand-picked properties for you
                        </h2>
                        <p className="mt-2 max-w-2xl text-muted-foreground">
                            Our most popular rentals this week — all verified, ready to
                            move in, and just a few clicks away.
                        </p>
                    </div>
                    <Button asChild variant="outline">
                        <Link href="/properties">
                            View all properties
                            <ArrowRight size={16} />
                        </Link>
                    </Button>
                </div>

                {featuredProperties.length > 0 ? (
                    <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                        {featuredProperties.map((property) => (
                            <PropertyCard
                                key={property.id}
                                property={property}
                            />
                        ))}
                    </div>
                ) : (
                    <PropertyEmpty />
                )}
            </section>

            {/* ========================= HOW IT WORKS ========================= */}
            <section className="container mx-auto px-4">
                <div className="mb-14 text-center">
                    <Badge
                        variant="outline"
                        className="mb-3 border-primary/20 bg-primary/5 text-primary"
                    >
                        How It Works
                    </Badge>
                    <h2 className="text-3xl font-bold sm:text-4xl">
                        Rent a home in 3 simple steps
                    </h2>
                    <p className="mx-auto mt-3 max-w-2xl text-muted-foreground">
                        No broker, no hidden fees, no hassle. RentNest takes you
                        from browsing to moving — all online.
                    </p>
                </div>

                <div className="grid gap-8 md:grid-cols-3">
                    {steps.map((s, idx) => {
                        const Icon = s.icon;
                        return (
                            <Card
                                key={s.step}
                                className="relative overflow-hidden border shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
                            >
                                <CardContent className="space-y-5 p-8">
                                    <div className="flex items-center justify-between">
                                        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                                            <Icon size={26} />
                                        </div>
                                        <span className="text-4xl font-bold text-primary/10">
                                            {s.step}
                                        </span>
                                    </div>
                                    <h3 className="text-xl font-semibold">
                                        {s.title}
                                    </h3>
                                    <p className="leading-7 text-muted-foreground">
                                        {s.description}
                                    </p>

                                    {idx < steps.length - 1 && (
                                        <div className="absolute right-0 top-1/2 hidden -translate-y-1/2 translate-x-1/2 md:block">
                                            <ArrowRight
                                                size={28}
                                                className="text-primary/30"
                                            />
                                        </div>
                                    )}
                                </CardContent>
                            </Card>
                        );
                    })}
                </div>
            </section>

            {/* ========================= TESTIMONIALS ========================= */}
            <section className="container mx-auto px-4">
                <div className="mb-14 text-center">
                    <Badge
                        variant="outline"
                        className="mb-3 border-primary/20 bg-primary/5 text-primary"
                    >
                        Testimonials
                    </Badge>
                    <h2 className="text-3xl font-bold sm:text-4xl">
                        Loved by tenants & landlords
                    </h2>
                </div>

                <div className="grid gap-6 md:grid-cols-3">
                    {testimonials.map((t) => (
                        <Card
                            key={t.name}
                            className="border shadow-sm transition hover:-translate-y-0.5 hover:shadow-lg"
                        >
                            <CardContent className="space-y-5 p-7">
                                <div className="flex items-center gap-1 text-amber-500">
                                    {Array.from({ length: t.rating }).map((_, i) => (
                                        <Star
                                            key={i}
                                            size={16}
                                            fill="currentColor"
                                        />
                                    ))}
                                </div>
                                <p className="leading-7 text-muted-foreground">
                                    &ldquo;{t.text}&rdquo;
                                </p>
                                <div className="flex items-center gap-3 pt-2">
                                    <Image
                                        src={t.avatar}
                                        alt={t.name}
                                        width={44}
                                        height={44}
                                        className="h-11 w-11 rounded-full border object-cover"
                                    />
                                    <div>
                                        <p className="font-semibold">{t.name}</p>
                                        <p className="text-xs text-muted-foreground">
                                            {t.role}
                                        </p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </section>

            {/* ========================= FINAL CTA ========================= */}
            <section className="container mx-auto px-4">
                <div className="relative overflow-hidden rounded-3xl border bg-linear-to-br from-primary via-primary to-blue-600 p-10 text-primary-foreground shadow-2xl sm:p-14">
                    <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full bg-white/10 blur-3xl" />
                    <div className="absolute -bottom-24 -left-16 h-72 w-72 rounded-full bg-black/10 blur-3xl" />

                    <div className="relative grid items-center gap-8 lg:grid-cols-[1.3fr_1fr]">
                        <div>
                            <h2 className="text-3xl font-bold sm:text-4xl">
                                Ready to find your dream rental?
                            </h2>
                            <p className="mt-4 max-w-xl text-primary-foreground/80">
                                Join thousands of happy tenants and landlords. Start browsing
                                properties today — it takes less than a minute to sign up.
                            </p>
                        </div>
                        <div className="flex flex-col gap-3 sm:flex-row lg:justify-end">
                            <Button
                                asChild
                                size="lg"
                                className="bg-background text-primary hover:bg-background/90"
                            >
                                <Link href="/properties">
                                    Browse Properties
                                    <ArrowRight size={18} />
                                </Link>
                            </Button>
                            <Button
                                asChild
                                size="lg"
                                variant="outline"
                                className="border-white/30 text-primary hover:bg-white/10 hover:text-primary-foreground"
                            >
                                <Link href="/register">Create account</Link>
                            </Button>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}