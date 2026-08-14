import { IRentalRequest } from "@/lib/types";
import { getLandlordRequests } from "../_actions/getLandlordRequests";
import { RentalRequestCard } from "../_components/RentalRequestCard";
import { RentalRequestEmpty } from "../_components/RentalRequestEmpty";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default async function RentalRequestsPage() {
    const result = await getLandlordRequests();

    const requests = result?.data ?? [];

    return (
        <div className="space-y-8">
            <Button variant="ghost" asChild>
                <Link href="/landlord-dashboard">
                    ← Back to Dashboard
                </Link>
            </Button>
            <div>
                <p className="text-sm font-medium text-primary">
                    Landlord Dashboard
                </p>

                <h1 className="mt-1 text-3xl font-bold">
                    Rental Requests
                </h1>

                <p className="mt-2 text-muted-foreground">
                    Review and manage requests from potential tenants.
                </p>
            </div>

            {requests.length > 0 ? (
                <div className="grid gap-6 lg:grid-cols-2">
                    {requests.map((request: IRentalRequest) => (
                        <RentalRequestCard
                            key={request.id}
                            request={request}
                        />
                    ))}
                </div>
            ) : (
                <RentalRequestEmpty />
            )}

        </div>
    );
}