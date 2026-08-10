import { Card, CardContent } from "@/components/ui/card";
import { Building2, CheckCircle2, Clock3, XCircle } from "lucide-react";
import { IRental } from "@/lib/types";

type DashboardStatsProps = {
    rentals: IRental[];
};

export default function DashboardStats({
    rentals,
}: DashboardStatsProps) {

    const total = rentals.length;

    const pending = rentals.filter(
        rental => rental.status === "PENDING"
    ).length;

    const approved = rentals.filter(
        rental => rental.status === "APPROVED"
    ).length;

    const rejected = rentals.filter(
        rental => rental.status === "REJECTED"
    ).length;

    const stats = [
        {
            title: "Total Requests",
            value: total,
            icon: Building2,
        },
        {
            title: "Pending",
            value: pending,
            icon: Clock3,
        },
        {
            title: "Approved",
            value: approved,
            icon: CheckCircle2,
        },
        {
            title: "Rejected",
            value: rejected,
            icon: XCircle,
        },
    ];

    return (
        <div className="mb-10 grid gap-5 md:grid-cols-2 lg:grid-cols-4">

            {stats.map((item) => {

                const Icon = item.icon;

                return (
                    <Card key={item.title}>
                        <CardContent className="flex items-center justify-between p-6">

                            <div>

                                <p className="text-sm text-muted-foreground">
                                    {item.title}
                                </p>

                                <h2 className="mt-2 text-3xl font-bold">
                                    {item.value}
                                </h2>

                            </div>

                            <Icon className="h-10 w-10 text-primary" />

                        </CardContent>
                    </Card>
                );
            })}

        </div>
    );
}