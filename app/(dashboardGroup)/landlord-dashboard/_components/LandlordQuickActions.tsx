import { ClipboardList, Building2 } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CreatePropertyDialog } from "./CreatePropertyDialog";


type Category = {
    id: string;
    name: string;
};

type LandlordQuickActionsProps = {
    categories: Category[];
};

export function LandlordQuickActions({
    categories,
}: LandlordQuickActionsProps) {
    return (
        <Card>
            <CardContent className="p-6">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <h2 className="text-xl font-semibold">
                            Quick Actions
                        </h2>

                        <p className="mt-1 text-sm text-muted-foreground">
                            Manage your properties and incoming rental requests.
                        </p>
                    </div>

                    <div className="flex flex-wrap gap-3">
                        <CreatePropertyDialog categories={categories} />

                        <Button variant="outline" asChild>
                            <Link href="/landlord-dashboard/properties">
                                <Building2 className="mr-2 h-4 w-4" />
                                My Properties
                            </Link>
                        </Button>

                        <Button variant="outline" asChild>
                            <Link href="/landlord-dashboard/requests">
                                <ClipboardList className="mr-2 h-4 w-4" />
                                Rental Requests
                            </Link>
                        </Button>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}