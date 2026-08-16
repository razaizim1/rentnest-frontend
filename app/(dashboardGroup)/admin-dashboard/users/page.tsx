import { getAdminUsers } from "../_actions/getAdminUsers";
import { AdminUserTable } from "../_components/AdminUserTable";

type AdminUsersPageProps = {
    searchParams: Promise<{
        page?: string;
    }>;
};

export default async function AdminUsersPage({
    searchParams,
}: AdminUsersPageProps) {
    const params = await searchParams;

    const currentPage = params.page || "1";
    const limit = "10";

    const result = await getAdminUsers({
        page: currentPage,
        limit,
    });

    if (!result.success) {
        throw new Error(result.message);
    }

    const users = result?.data?.data ?? [];
    const meta = result?.data?.meta;

    const total = Number(meta?.total || 0);
    const pageSize = Number(meta?.limit || 10);
    const page = Number(meta?.page || 1);
    const totalPages = Math.ceil(
        total / pageSize
    );

    return (
        <div className="space-y-8">

            <div>
                <p className="text-sm font-medium text-primary">
                    Admin Panel
                </p>

                <h1 className="mt-1 text-3xl font-bold">
                    User Management
                </h1>

                <p className="mt-2 text-muted-foreground">
                    Manage platform users and account status.
                </p>
            </div>

            <div className="text-sm text-muted-foreground">
                {total}{" "}
                {total === 1 ? "user" : "users"} found
            </div>

            <AdminUserTable users={users} />

            {/* Pagination */}
            {totalPages > 1 && (
                <div className="flex items-center justify-between">
                    <a
                        href={
                            page > 1
                                ? `/admin-dashboard/users?page=${page - 1}`
                                : "#"
                        }
                        className={
                            page > 1
                                ? "rounded-lg border px-4 py-2 text-sm"
                                : "pointer-events-none rounded-lg border px-4 py-2 text-sm opacity-50"
                        }
                    >
                        Previous
                    </a>

                    <span className="text-sm text-muted-foreground">
                        Page {page} of {totalPages}
                    </span>

                    <a
                        href={
                            page < totalPages
                                ? `/admin-dashboard/users?page=${page + 1}`
                                : "#"
                        }
                        className={
                            page < totalPages
                                ? "rounded-lg border px-4 py-2 text-sm"
                                : "pointer-events-none rounded-lg border px-4 py-2 text-sm opacity-50"
                        }
                    >
                        Next
                    </a>
                </div>
            )}
        </div>
    );
}