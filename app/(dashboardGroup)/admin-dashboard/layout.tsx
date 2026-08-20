import Link from "next/link";

export const dynamic = "force-dynamic";

export default function AdminDashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="space-y-8">
            <div className="flex flex-wrap gap-2 rounded-2xl border bg-card p-2">
                <Link
                    href="/admin-dashboard"
                    className="rounded-xl px-4 py-2 text-sm font-medium hover:bg-muted"
                >
                    Dashboard
                </Link>
                <Link
                    href="/admin-dashboard/users"
                    className="rounded-xl px-4 py-2 text-sm font-medium hover:bg-muted"
                >
                    Users
                </Link>
                <Link
                    href="/admin-dashboard/properties"
                    className="rounded-xl px-4 py-2 text-sm font-medium hover:bg-muted"
                >
                    Properties
                </Link>
                <Link
                    href="/admin-dashboard/rentals"
                    className="rounded-xl px-4 py-2 text-sm font-medium hover:bg-muted"
                >
                    Rental Requests
                </Link>
            </div>
            {children}
        </div>
    );
}
