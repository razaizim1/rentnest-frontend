"use client";

import {
    CheckCircle2,
    Clock3,
    CreditCard,
    XCircle,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { IRental } from "@/lib/types";

type PaymentHistoryTableProps = {
    rentals: IRental[];
};

export function PaymentHistoryTable({
    rentals,
}: PaymentHistoryTableProps) {
    const payments = rentals
        .filter((rental) => rental.payment)
        .sort(
            (a, b) =>
                new Date(
                    b.payment?.paidAt ||
                    b.payment?.createdAt ||
                    ""
                ).getTime() -
                new Date(
                    a.payment?.paidAt ||
                    a.payment?.createdAt ||
                    ""
                ).getTime()
        );

    const getStatusIcon = (status: string) => {
        switch (status) {
            case "COMPLETED":
                return (
                    <CheckCircle2 className="h-4 w-4" />
                );

            case "PENDING":
                return (
                    <Clock3 className="h-4 w-4" />
                );

            case "FAILED":
                return (
                    <XCircle className="h-4 w-4" />
                );

            default:
                return (
                    <CreditCard className="h-4 w-4" />
                );
        }
    };

    const getStatusClass = (status: string) => {
        switch (status) {
            case "COMPLETED":
                return "border-green-200 bg-green-100 text-green-700";

            case "PENDING":
                return "border-yellow-200 bg-yellow-100 text-yellow-700";

            case "FAILED":
                return "border-red-200 bg-red-100 text-red-700";

            default:
                return "border-muted bg-muted text-muted-foreground";
        }
    };

    if (!payments.length) {
        return (
            <Card>
                <CardHeader>
                    <CardTitle>
                        Payment History
                    </CardTitle>
                </CardHeader>

                <CardContent>
                    <div className="rounded-xl border border-dashed p-8 text-center">
                        <CreditCard className="mx-auto h-8 w-8 text-muted-foreground" />

                        <p className="mt-3 font-medium">
                            No payment history
                        </p>

                        <p className="mt-1 text-sm text-muted-foreground">
                            Your completed payments will appear here.
                        </p>
                    </div>
                </CardContent>
            </Card>
        );
    }

    return (
        <Card className="overflow-hidden">
            <CardHeader>
                <CardTitle>
                    Payment History
                </CardTitle>

                <p className="text-sm text-muted-foreground">
                    View your rental payment transactions.
                </p>
            </CardHeader>

            <CardContent className="p-0">
                <div className="overflow-x-auto">
                    <table className="w-full min-w-[800px] text-sm">
                        <thead className="border-y bg-muted/50">
                            <tr>
                                <th className="px-6 py-4 text-left font-semibold">
                                    Property
                                </th>

                                <th className="px-6 py-4 text-left font-semibold">
                                    Amount
                                </th>

                                <th className="px-6 py-4 text-left font-semibold">
                                    Method
                                </th>

                                <th className="px-6 py-4 text-left font-semibold">
                                    Provider
                                </th>

                                <th className="px-6 py-4 text-left font-semibold">
                                    Transaction
                                </th>

                                <th className="px-6 py-4 text-left font-semibold">
                                    Status
                                </th>

                                <th className="px-6 py-4 text-left font-semibold">
                                    Paid At
                                </th>
                            </tr>
                        </thead>

                        <tbody>
                            {payments.map((rental) => {
                                const payment = rental.payment!;

                                return (
                                    <tr
                                        key={payment.id}
                                        className="border-b last:border-0 hover:bg-muted/30"
                                    >
                                        {/* Property */}
                                        <td className="px-6 py-4">
                                            <div>
                                                <p className="font-medium">
                                                    {
                                                        rental
                                                            .property
                                                            .title
                                                    }
                                                </p>

                                                <p className="text-xs text-muted-foreground">
                                                    {
                                                        rental
                                                            .property
                                                            .location
                                                    }
                                                </p>
                                            </div>
                                        </td>

                                        {/* Amount */}
                                        <td className="px-6 py-4 font-semibold">
                                            ৳{" "}
                                            {payment.amount.toLocaleString()}
                                        </td>

                                        {/* Method */}
                                        <td className="px-6 py-4">
                                            {payment.method}
                                        </td>

                                        {/* Provider */}
                                        <td className="px-6 py-4">
                                            <Badge variant="outline">
                                                {payment.provider}
                                            </Badge>
                                        </td>

                                        {/* Transaction */}
                                        <td className="max-w-[220px] px-6 py-4">
                                            <p className="truncate font-mono text-xs text-muted-foreground">
                                                {
                                                    payment.transactionId
                                                }
                                            </p>
                                        </td>

                                        {/* Status */}
                                        <td className="px-6 py-4">
                                            <Badge
                                                className={`flex w-fit items-center gap-1 border ${getStatusClass(
                                                    payment.status
                                                )}`}
                                            >
                                                {getStatusIcon(
                                                    payment.status
                                                )}

                                                {payment.status}
                                            </Badge>
                                        </td>

                                        {/* Paid At */}
                                        <td className="whitespace-nowrap px-6 py-4 text-muted-foreground">
                                            {payment.paidAt
                                                ? new Date(
                                                    payment.paidAt
                                                ).toLocaleDateString(
                                                    "en-GB",
                                                    {
                                                        day: "2-digit",
                                                        month: "short",
                                                        year: "numeric",
                                                    }
                                                )
                                                : "—"}
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </CardContent>
        </Card>
    );
}