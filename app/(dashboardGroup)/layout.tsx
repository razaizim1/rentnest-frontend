import { Navbar } from "@/components/shared/navbar";
import { getMe } from "@/service/getMe";

export const dynamic = "force-dynamic";

export default async function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const user = await getMe();

    return (
        <div className="min-h-screen">
            <Navbar user={user} />
            <main>
                <div className="container mx-auto px-4 py-8 sm:px-6 lg:px-8">
                    {children}
                </div>
            </main>
        </div>
    );
}
