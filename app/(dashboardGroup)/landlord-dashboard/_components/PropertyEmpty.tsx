import Link from "next/link";
import { Building2, Plus } from "lucide-react";

import { Button } from "@/components/ui/button";

export function PropertyEmpty() {
    return (
        <div className="flex min-h-[400px] flex-col items-center justify-center rounded-2xl border border-dashed p-8 text-center">
            <Building2 className="h-12 w-12 text-muted-foreground" />

            <h2 className="mt-4 text-xl font-semibold">
                No properties yet
            </h2>

            <p className="mt-2 max-w-md text-sm text-muted-foreground">
                You haven&apos; listed any properties yet. Add your first property
                to start receiving rental requests.
            </p>

            <Button className="mt-6" asChild>
                <Link href="/landlord-dashboard/properties/new">
                    <Plus className="mr-2 h-4 w-4" />
                    Add Property
                </Link>
            </Button>
        </div>
    );
}