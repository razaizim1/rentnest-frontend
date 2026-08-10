import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

import { IRental } from "@/lib/types";

import RentalCard from "./RentalCard";

type RentalGridProps = {
    rentals: IRental[];
};

export default function RentalGrid({
    rentals,
}: RentalGridProps) {

    // Empty State
    if (rentals.length === 0) {
        return (
            <Card className="py-16">
                <CardContent className="flex flex-col items-center justify-center text-center">

                    <h2 className="text-2xl font-bold">
                        No Rental Requests Yet
                    </h2>

                    <p className="mt-3 max-w-md text-muted-foreground">
                        You haven&apos;t requested any rental property yet.
                        Browse available properties and submit your first rental request.
                    </p>

                    <Button
                        asChild
                        className="mt-6"
                    >
                        <Link href="/properties">
                            Browse Properties
                        </Link>
                    </Button>

                </CardContent>
            </Card>
        );
    }

    // Rental List
    return (
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {rentals.map((rental) => (
                <RentalCard
                    key={rental.id}
                    rental={rental}
                />
            ))}
        </div>
    );
}