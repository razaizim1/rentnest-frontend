import { getMyRentals } from "./_actions/getMyRentals";
import DashboardStats from "./_components/DashboardStats";
import { PaymentHistoryTable } from "./_components/PaymentHistoryTable";
import RentalGrid from "./_components/RentalGrid";


export default async function DashboardPage() {

    const result = await getMyRentals();

    if (!result.success) {
        throw new Error(result.message);
    }
    const rentals = result.data ?? [];

    return (
        <div className="container mx-auto py-10">

            <div className="mb-10">
                <h1 className="text-4xl font-bold">
                    Dashboard
                </h1>

                <p className="text-muted-foreground mt-2">
                    Manage your rental requests.
                </p>
            </div>

            <DashboardStats rentals={rentals} />

            <RentalGrid rentals={rentals} />

            <div className="mt-10">
                <PaymentHistoryTable rentals={rentals} />
            </div>
        </div>
    );
}