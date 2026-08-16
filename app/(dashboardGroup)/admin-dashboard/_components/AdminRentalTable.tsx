import { CalendarDays } from "lucide-react";
import { format } from "date-fns";

import { Badge } from "@/components/ui/badge";

import { IRentalRequest } from "@/lib/types";

type AdminRentalTableProps = {
    rentals: IRentalRequest[];
};

export function AdminRentalTable({
    rentals,
}: AdminRentalTableProps) {
    if (!rentals.length) {
        return (
            <div className="rounded-2xl border border-dashed p-10 text-center">
                <p className="font-medium">
                    No rental requests found
                </p>

                <p className="mt-1 text-sm text-muted-foreground">
                    There are no rental requests available to display.
                </p>
            </div>
        );
    }

    return (
        <div className="overflow-hidden rounded-2xl border bg-card">
            <div className="overflow-x-auto">
                <table className="w-full min-w-[1000px] text-sm">
                    <thead className="border-b bg-muted/50">
                        <tr>
                            <th className="px-5 py-4 text-left font-semibold">
                                Tenant
                            </th>

                            <th className="px-5 py-4 text-left font-semibold">
                                Property
                            </th>

                            <th className="px-5 py-4 text-left font-semibold">
                                Landlord
                            </th>

                            <th className="px-5 py-4 text-left font-semibold">
                                Status
                            </th>

                            <th className="px-5 py-4 text-left font-semibold">
                                Move In
                            </th>

                            <th className="px-5 py-4 text-left font-semibold">
                                Message
                            </th>
                        </tr>
                    </thead>

                    <tbody>
                        {rentals.map((rental) => (
                            <tr
                                key={rental.id}
                                className="border-b last:border-0 hover:bg-muted/30"
                            >
                                {/* Tenant */}
                                <td className="px-5 py-4">
                                    <div>
                                        <p className="font-medium">
                                            {rental.tenant?.name ??
                                                "N/A"}
                                        </p>

                                        <p className="text-xs text-muted-foreground">
                                            {rental.tenant?.email ??
                                                "N/A"}
                                        </p>
                                    </div>
                                </td>

                                {/* Property */}
                                <td className="px-5 py-4">
                                    <div>
                                        <p className="font-medium">
                                            {rental.property?.title ??
                                                "N/A"}
                                        </p>

                                        <p className="text-xs text-muted-foreground">
                                            {rental.property?.location ??
                                                "N/A"}
                                        </p>
                                    </div>
                                </td>

                                {/* Landlord */}
                                <td className="px-5 py-4">
                                    <div>
                                        <p className="font-medium">
                                            {rental.property?.landlord
                                                ?.name ?? "N/A"}
                                        </p>

                                        <p className="text-xs text-muted-foreground">
                                            {rental.property?.landlord
                                                ?.email ?? "N/A"}
                                        </p>
                                    </div>
                                </td>

                                {/* Status */}
                                <td className="px-5 py-4">
                                    <Badge
                                        className={
                                            rental.status ===
                                                "APPROVED"
                                                ? "bg-green-100 text-green-700 hover:bg-green-100"
                                                : rental.status ===
                                                    "PENDING"
                                                    ? "bg-yellow-100 text-yellow-700 hover:bg-yellow-100"
                                                    : rental.status ===
                                                        "REJECTED"
                                                        ? "bg-red-100 text-red-700 hover:bg-red-100"
                                                        : "bg-blue-100 text-blue-700 hover:bg-blue-100"
                                        }
                                    >
                                        {rental.status}
                                    </Badge>
                                </td>

                                {/* Move In */}
                                <td className="px-5 py-4">
                                    <div className="flex items-center gap-2 text-muted-foreground">
                                        <CalendarDays className="h-4 w-4" />

                                        <span>
                                            {format(
                                                new Date(
                                                    rental.moveInDate
                                                ),
                                                "dd MMM yyyy"
                                            )}
                                        </span>
                                    </div>
                                </td>

                                {/* Message */}
                                <td className="max-w-[250px] px-5 py-4">
                                    <p className="truncate text-muted-foreground">
                                        {rental.message || "No message"}
                                    </p>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}