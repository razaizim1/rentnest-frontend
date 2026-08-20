import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { IRentalRequest } from "@/lib/types";

type TenantHistoryProps = {
    requests: IRentalRequest[];
};

export function TenantHistory({ requests }: TenantHistoryProps) {
    const history = [...requests].sort(
        (a, b) =>
            new Date(b.moveInDate).getTime() - new Date(a.moveInDate).getTime()
    );

    return (
        <Card>
            <CardHeader>
                <CardTitle>Tenant History</CardTitle>
                <p className="text-sm text-muted-foreground">
                    Review tenants who have requested or rented your properties.
                </p>
            </CardHeader>
            <CardContent>
                {!history.length ? (
                    <div className="rounded-xl border border-dashed p-8 text-center text-sm text-muted-foreground">
                        No tenant history yet.
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full min-w-[700px] text-sm">
                            <thead className="border-y bg-muted/50">
                                <tr>
                                    <th className="px-4 py-3 text-left font-semibold">Tenant</th>
                                    <th className="px-4 py-3 text-left font-semibold">Property</th>
                                    <th className="px-4 py-3 text-left font-semibold">Move-in</th>
                                    <th className="px-4 py-3 text-left font-semibold">Status</th>
                                    <th className="px-4 py-3 text-left font-semibold">Payment</th>
                                </tr>
                            </thead>
                            <tbody>
                                {history.map((request) => (
                                    <tr key={request.id} className="border-b last:border-0">
                                        <td className="px-4 py-3">
                                            <p className="font-medium">{request.tenant.name}</p>
                                            <p className="text-xs text-muted-foreground">
                                                {request.tenant.email}
                                            </p>
                                        </td>
                                        <td className="px-4 py-3">{request.property.title}</td>
                                        <td className="px-4 py-3 text-muted-foreground">
                                            {new Date(request.moveInDate).toLocaleDateString("en-GB", {
                                                day: "2-digit",
                                                month: "short",
                                                year: "numeric",
                                            })}
                                        </td>
                                        <td className="px-4 py-3">
                                            <Badge variant="outline">{request.status}</Badge>
                                        </td>
                                        <td className="px-4 py-3 text-muted-foreground">
                                            {request.payment?.status || "—"}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </CardContent>
        </Card>
    );
}
