import { IAdminProperty } from "@/lib/types";
import { getAdminProperties } from "../_actions/getAdminProperties";
import { AdminPropertyTable } from "../_components/AdminPropertyTable";

type AdminPropertiesPageProps = {
    searchParams: Promise<{
        page?: string;
    }>;
};

export default async function AdminPropertiesPage({
    searchParams,
}: AdminPropertiesPageProps) {
    const params = await searchParams;

    const result = await getAdminProperties({
        page: params.page || "1",
        limit: "10",
    });
console.log("ADMIN PROPERTY RESULT:", result);
    const properties: IAdminProperty[] =
        result?.data ?? [];

    const meta = result?.meta;
console.log("PROPERTIES:", properties);
console.log("META:", meta);
    return (
        <div className="space-y-8">
            <div>
                <p className="text-sm font-medium text-primary">
                    Admin Panel
                </p>

                <h1 className="mt-1 text-3xl font-bold">
                    Property Management
                </h1>

                <p className="mt-2 text-muted-foreground">
                    Monitor all properties listed on the platform.
                </p>
            </div>

            <AdminPropertyTable
                properties={properties}
            />

            <p className="text-sm text-muted-foreground">
                Total properties: {meta?.total ?? 0}
            </p>
        </div>
    );
}