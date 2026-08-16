import {
    Building2,
    ClipboardList,
    Users,
} from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";

type AdminStatsProps = {
    totalUsers: number;
    totalProperties: number;
    pendingRequests: number;
};

export function AdminStats({
    totalUsers,
    totalProperties,
    pendingRequests,
}: AdminStatsProps) {
    const stats = [
        {
            title: "Total Users",
            value: totalUsers,
            icon: Users,
        },
        {
            title: "Total Properties",
            value: totalProperties,
            icon: Building2,
        },
        {
            title: "Pending Requests",
            value: pendingRequests,
            icon: ClipboardList,
        },
    ];

    return (
        <div className="grid gap-6 md:grid-cols-3">
            {stats.map((stat) => {
                const Icon = stat.icon;

                return (
                    <Card
                        key={stat.title}
                        className="rounded-2xl"
                    >
                        <CardContent className="p-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm text-muted-foreground">
                                        {stat.title}
                                    </p>

                                    <p className="mt-2 text-3xl font-bold">
                                        {stat.value}
                                    </p>
                                </div>

                                <div className="rounded-xl bg-primary/10 p-3">
                                    <Icon className="h-6 w-6 text-primary" />
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                );
            })}
        </div>
    );
}