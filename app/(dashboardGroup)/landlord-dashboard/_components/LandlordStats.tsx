import {
    Building2,
    Clock3,
    CircleCheck,
    Home,
    Wallet,
} from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { LandlordStatsProps } from "@/lib/types";

export function LandlordStats({
    totalProperties,
    pendingRequests,
    approvedRequests,
    activeRequests,
    earnings,
}: LandlordStatsProps) {
    const stats = [
        {
            title: "Total Properties",
            value: totalProperties,
            icon: Building2,
        },
        {
            title: "Active Requests",
            value: activeRequests,
            icon: Home,
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
            title: "Earnings",
            value: `৳ ${earnings.toLocaleString()}`,
            icon: Wallet,
        },
    ];

    return (
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
            {stats.map((stat) => {
                const Icon = stat.icon;

                return (
                    <Card key={stat.title}>
                        <CardContent className="flex items-center justify-between p-6">
                            <div>
                                <p className="text-sm text-muted-foreground">
                                    {stat.title}
                                </p>
                                <p className="mt-2 text-2xl font-bold xl:text-3xl">
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
