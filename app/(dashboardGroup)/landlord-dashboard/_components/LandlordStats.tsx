import {
    Building2,
    Clock3,
    CircleCheck,
    Home,
} from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { LandlordStatsProps } from "@/lib/types";

export function LandlordStats({
    totalProperties,
    pendingRequests,
    approvedRequests,
    activeRequests,
}: LandlordStatsProps) {
    const stats = [
        {
            title: "Total Properties",
            value: totalProperties,
            icon: Building2,
        },
        {
            title: "Pending Requests",
            value: pendingRequests,
            icon: Clock3,
        },
        {
            title: "Approved Requests",
            value: approvedRequests,
            icon: CircleCheck,
        },
        {
            title: "Active Rentals",
            value: activeRequests,
            icon: Home,
        },
    ];

    return (
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {stats.map((stat) => {
                const Icon = stat.icon;

                return (
                    <Card key={stat.title}>
                        <CardContent className="flex items-center justify-between p-6">
                            <div>
                                <p className="text-sm text-muted-foreground">
                                    {stat.title}
                                </p>

                                <p className="mt-2 text-3xl font-bold">
                                    {stat.value}
                                </p>
                            </div>

                            <div className="rounded-xl bg-primary/10 p-3 text-primary">
                                <Icon size={22} />
                            </div>
                        </CardContent>
                    </Card>
                );
            })}
        </div>
    );
}