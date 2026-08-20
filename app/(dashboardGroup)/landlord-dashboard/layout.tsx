import Link from "next/link";

export const dynamic = "force-dynamic";

export default function LandlordDashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="space-y-8">
            <div className="flex flex-wrap gap-2 rounded-2xl border bg-card p-2">
                <Link
                    href="/landlord-dashboard"
                    className="rounded-xl px-4 py-2 text-sm font-medium hover:bg-muted"
                >
                    Overview
                </Link>
                <Link
                    href="/landlord-dashboard/properties"
                    className="rounded-xl px-4 py-2 text-sm font-medium hover:bg-muted"
                >
                    Properties
                </Link>
                <Link
                    href="/landlord-dashboard/requests"
                    className="rounded-xl px-4 py-2 text-sm font-medium hover:bg-muted"
                >
                    Requests
                </Link>
            </div>
            {children}
        </div>
    );
}
