import { getCategories } from "./_actions/getCategories";
import { getLandlordProperties } from "./_actions/getLandlordProperties";
import { getLandlordRequests } from "./_actions/getLandlordRequests";
import { LandlordQuickActions } from "./_components/LandlordQuickActions";
import { LandlordStats } from "./_components/LandlordStats";

export default async function LandlordDashboardPage() {
    const [
        propertyResult,
        requestResult,
        categoryResult,
    ] = await Promise.all([
        getLandlordProperties(),
        getLandlordRequests(),
        getCategories(),
    ]);

    if (!propertyResult.success) {
        throw new Error(propertyResult.message);
    }

    if (!requestResult.success) {
        throw new Error(requestResult.message);
    }

    if (!categoryResult.success) {
        throw new Error(categoryResult.message);
    }

    const properties = propertyResult?.data ?? [];
    const requests = requestResult?.data ?? [];
    const categories = categoryResult?.data ?? [];

    const totalProperties = properties.length;

    const pendingRequests = requests.filter(
        (request: { status: string }) =>
            request.status === "PENDING"
    ).length;

    const approvedRequests = requests.filter(
        (request: { status: string }) =>
            request.status === "APPROVED"
    ).length;

    const activeRequests = requests.filter(
        (request: { status: string }) =>
            request.status === "ACTIVE"
    ).length;

    return (
        <div className="space-y-8">
            <div>
                <p className="text-sm font-medium text-primary">
                    Landlord Dashboard
                </p>

                <h1 className="mt-1 text-3xl font-bold">
                    Manage Your Rentals
                </h1>

                <p className="mt-2 text-muted-foreground">
                    Manage your properties and rental requests from one place.
                </p>
            </div>

            <LandlordStats
                totalProperties={totalProperties}
                pendingRequests={pendingRequests}
                approvedRequests={approvedRequests}
                activeRequests={activeRequests}
            />

            <LandlordQuickActions
                categories={categories}
            />
        </div>
    );
}