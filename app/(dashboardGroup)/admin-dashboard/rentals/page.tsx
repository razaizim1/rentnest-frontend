import { IRentalRequest } from "@/lib/types";
import { getAdminRentals } from "../_actions/getAdminRentals";
import { AdminRentalTable } from "../_components/AdminRentalTable";

export default async function AdminRentalsPage() {
    const result = await getAdminRentals();

    if (!result.success) {
        throw new Error(result.message);
    }

    const rentals: IRentalRequest[] =
        result?.data ?? [];

    return (
        <div className="space-y-8">

            <div>
                <p className="text-sm font-medium text-primary">
                    Admin Panel
                </p>

                <h1 className="mt-1 text-3xl font-bold">
                    Rental Requests
                </h1>

                <p className="mt-2 text-muted-foreground">
                    Monitor all rental requests across the platform.
                </p>
            </div>

            <AdminRentalTable rentals={rentals} />

        </div>
    );
}