import { getAdminUsers } from "./_actions/getAdminUsers";
import { getAdminProperties } from "./_actions/getAdminProperties";
import { getAdminRentals } from "./_actions/getAdminRentals";
import { AdminStats } from "./_components/AdminStats";

export default async function AdminDashboardPage() {
    const [
        usersResult,
        propertiesResult,
        rentalsResult,
    ] = await Promise.all([
        getAdminUsers({
            page: "1",
            limit: "1",
        }),

        getAdminProperties({
            page: "1",
            limit: "1",
        }),

        getAdminRentals(),
    ]);

    const totalUsers =
        Number(usersResult?.data?.meta?.total || 0);

    const totalProperties =
        Number(
            propertiesResult?.data?.meta?.total || 0
        );

    const rentals =
        rentalsResult?.data ?? [];

    const pendingRequests = rentals.filter(
        (rental: { status: string }) =>
            rental.status === "PENDING"
    ).length;

    return (
        <div className="space-y-8">

            <div>
                <p className="text-sm font-medium text-primary">
                    Admin Panel
                </p>

                <h1 className="mt-1 text-3xl font-bold">
                    Dashboard Overview
                </h1>

                <p className="mt-2 text-muted-foreground">
                    Monitor users, properties, and rental activity.
                </p>
            </div>

            <AdminStats
                totalUsers={totalUsers}
                totalProperties={totalProperties}
                pendingRequests={pendingRequests}
            />

        </div>
    );
}