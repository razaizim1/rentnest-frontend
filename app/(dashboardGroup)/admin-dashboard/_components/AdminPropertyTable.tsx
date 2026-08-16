import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { AdminPropertyTableProps } from "@/lib/types";




export function AdminPropertyTable({
    properties,
}: AdminPropertyTableProps) {
    if (!properties.length) {
        return (
            <div className="rounded-2xl border border-dashed p-10 text-center">
                <p className="font-medium">
                    No properties found
                </p>

                <p className="mt-1 text-sm text-muted-foreground">
                    There are no properties available to display.
                </p>
            </div>
        );
    }

    return (
        <div className="overflow-hidden rounded-2xl border bg-card">
            <div className="overflow-x-auto">
                <table className="w-full min-w-[900px] text-sm">
                    <thead className="border-b bg-muted/50">
                        <tr>
                            <th className="px-5 py-4 text-left font-semibold">
                                Property
                            </th>

                            <th className="px-5 py-4 text-left font-semibold">
                                Landlord
                            </th>

                            <th className="px-5 py-4 text-left font-semibold">
                                Category
                            </th>

                            <th className="px-5 py-4 text-left font-semibold">
                                Rent
                            </th>

                            <th className="px-5 py-4 text-left font-semibold">
                                Availability
                            </th>

                            <th className="px-5 py-4 text-left font-semibold">
                                Requests
                            </th>
                        </tr>
                    </thead>

                    <tbody>
                        {properties.map((property) => (
                            <tr
                                key={property.id}
                                className="border-b last:border-0 hover:bg-muted/30"
                            >
                                {/* Property */}
                                <td className="px-5 py-4">
                                    <div className="flex items-center gap-3">
                                        <div className="relative h-12 w-16 shrink-0 overflow-hidden rounded-lg">
                                            <Image
                                                src={property.image}
                                                alt={property.title}
                                                fill
                                                sizes="64px"
                                                className="object-cover"
                                            />
                                        </div>

                                        <div className="min-w-0">
                                            <p className="truncate font-medium">
                                                {property.title}
                                            </p>

                                            <p className="truncate text-xs text-muted-foreground">
                                                {property.location}
                                            </p>
                                        </div>
                                    </div>
                                </td>

                                {/* Landlord */}
                                <td className="px-5 py-4">
                                    <div>
                                        <p className="font-medium">
                                            {property.landlord?.name ??
                                                "N/A"}
                                        </p>

                                        <p className="text-xs text-muted-foreground">
                                            {property.landlord?.email ??
                                                "N/A"}
                                        </p>
                                    </div>
                                </td>

                                {/* Category */}
                                <td className="px-5 py-4">
                                    <Badge variant="outline">
                                        {property.category?.name ??
                                            "N/A"}
                                    </Badge>
                                </td>

                                {/* Rent */}
                                <td className="px-5 py-4 font-semibold">
                                    ৳ {property.rentAmount.toLocaleString()}
                                    <span className="ml-1 text-xs font-normal text-muted-foreground">
                                        /month
                                    </span>
                                </td>

                                {/* Availability */}
                                <td className="px-5 py-4">
                                    {property.available ? (
                                        <Badge className="bg-green-100 text-green-700 hover:bg-green-100">
                                            Available
                                        </Badge>
                                    ) : (
                                        <Badge className="bg-red-100 text-red-700 hover:bg-red-100">
                                            Rented
                                        </Badge>
                                    )}
                                </td>

                                {/* Requests */}
                                <td className="px-5 py-4">
                                    <Badge variant="secondary">
                                        {property._count?.rentalRequests ??
                                            0}
                                    </Badge>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}