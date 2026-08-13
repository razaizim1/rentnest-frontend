"use client";

import { useTransition } from "react";
import {
    CalendarDays,
    CheckCircle2,
    Clock3,
    Home,
    MapPin,
    User,
    XCircle,
} from "lucide-react";
import { format } from "date-fns";
import { toast } from "sonner";

import Image from "next/image";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardHeader,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

import { IRentalRequest } from "@/lib/types";
import { updateRentalRequest } from "../_actions/updateRentalRequest";

type RentalRequestCardProps = {
    request: IRentalRequest;
};

export function RentalRequestCard({
    request,
}: RentalRequestCardProps) {
    const [pending, startTransition] = useTransition();

    const handleStatusUpdate = (
        status: "APPROVED" | "REJECTED"
    ) => {
        startTransition(async () => {
            const result = await updateRentalRequest(
                request.id,
                status
            );

            if (!result.success) {
                toast.error(result.message);
                return;
            }

            toast.success(result.message);

            window.location.reload();
        });
    };

    const statusConfig = {
        PENDING: {
            label: "Pending Review",
            icon: Clock3,
            className:
                "border-amber-200 bg-amber-50 text-amber-700",
        },
        APPROVED: {
            label: "Approved",
            icon: CheckCircle2,
            className:
                "border-emerald-200 bg-emerald-50 text-emerald-700",
        },
        REJECTED: {
            label: "Rejected",
            icon: XCircle,
            className:
                "border-red-200 bg-red-50 text-red-700",
        },
        ACTIVE: {
            label: "Active",
            icon: CheckCircle2,
            className:
                "border-blue-200 bg-blue-50 text-blue-700",
        },
        COMPLETED: {
            label: "Completed",
            icon: CheckCircle2,
            className:
                "border-slate-200 bg-slate-50 text-slate-700",
        },
    };

    const config = statusConfig[request.status];
    const StatusIcon = config.icon;

    return (
        <Card className="overflow-hidden rounded-2xl border shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md">
            {/* Property Header */}
            <CardHeader className="p-0">
                <div className="relative">
                    <Image
                        src={request.property.image}
                        alt={request.property.title}
                        width={700}
                        height={400}
                        className="h-52 w-full object-cover"
                    />

                    <div className="absolute inset-x-0 bottom-0 bg-linear-to-t from-black/70 via-black/20 to-transparent p-5">
                        <div className="flex items-end justify-between gap-4">
                            <div className="min-w-0 text-white">
                                <h2 className="truncate text-xl font-semibold">
                                    {request.property.title}
                                </h2>

                                <div className="mt-1 flex items-center gap-2 text-sm text-white/80">
                                    <MapPin size={15} />
                                    <span className="truncate">
                                        {request.property.location}
                                    </span>
                                </div>
                            </div>

                            <Badge
                                variant="outline"
                                className={`shrink-0 gap-1.5 ${config.className}`}
                            >
                                <StatusIcon size={14} />
                                {config.label}
                            </Badge>
                        </div>
                    </div>
                </div>
            </CardHeader>

            <CardContent className="space-y-5 p-5">
                {/* Tenant */}
                <div className="flex items-center gap-4">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                        <User size={20} />
                    </div>

                    <div className="min-w-0">
                        <p className="text-sm text-muted-foreground">
                            Rental Applicant
                        </p>

                        <p className="truncate font-semibold">
                            {request.tenant.name}
                        </p>

                        <p className="truncate text-sm text-muted-foreground">
                            {request.tenant.email}
                        </p>
                    </div>
                </div>

                <Separator />

                {/* Rental Information */}
                <div className="grid grid-cols-2 gap-4">
                    <div className="rounded-xl bg-muted/40 p-4">
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <Home size={16} />
                            Monthly Rent
                        </div>

                        <p className="mt-2 text-xl font-bold text-primary">
                            ৳{" "}
                            {request.property.rentAmount.toLocaleString()}
                        </p>
                    </div>

                    <div className="rounded-xl bg-muted/40 p-4">
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <CalendarDays size={16} />
                            Move-in Date
                        </div>

                        <p className="mt-2 font-semibold">
                            {format(
                                new Date(request.moveInDate),
                                "dd MMM yyyy"
                            )}
                        </p>
                    </div>
                </div>

                {/* Tenant Message */}
                {request.message && (
                    <div className="rounded-xl border bg-background p-4">
                        <p className="text-sm font-medium">
                            Tenant Message
                        </p>

                        <p className="mt-2 text-sm leading-6 text-muted-foreground">
                            {request.message}
                        </p>
                    </div>
                )}

                {/* Actions */}
                {request.status === "PENDING" && (
                    <div className="grid grid-cols-2 gap-3 pt-1">
                        <Button
                            disabled={pending}
                            onClick={() =>
                                handleStatusUpdate("REJECTED")
                            }
                            variant="outline"
                            className="border-red-200 text-red-600 hover:bg-red-50 hover:text-red-700"
                        >
                            <XCircle className="mr-2 h-4 w-4" />
                            {pending ? "Processing..." : "Reject"}
                        </Button>

                        <Button
                            disabled={pending}
                            onClick={() =>
                                handleStatusUpdate("APPROVED")
                            }
                        >
                            <CheckCircle2 className="mr-2 h-4 w-4" />
                            {pending ? "Processing..." : "Approve"}
                        </Button>
                    </div>
                )}

                {request.status === "APPROVED" && (
                    <div className="flex items-center gap-2 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
                        <CheckCircle2 size={18} />
                        This rental request has been approved.
                    </div>
                )}

                {request.status === "REJECTED" && (
                    <div className="flex items-center gap-2 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                        <XCircle size={18} />
                        This rental request has been rejected.
                    </div>
                )}
            </CardContent>
        </Card>
    );
}