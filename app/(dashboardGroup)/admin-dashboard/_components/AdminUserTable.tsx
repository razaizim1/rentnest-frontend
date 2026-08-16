"use client";

import { useState, useTransition } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog";

import { updateUserStatus } from "../_actions/updateUserStatus";

type AdminUser = {
    id: string;
    name: string;
    email: string;
    phone: string;
    role: string;
    status: "ACTIVE" | "BANNED";
    createdAt: string;
};

type AdminUserTableProps = {
    users: AdminUser[];
};

export function AdminUserTable({
    users,
}: AdminUserTableProps) {
    const [pending, startTransition] = useTransition();

    const [selectedUser, setSelectedUser] =
        useState<AdminUser | null>(null);

    const [dialogOpen, setDialogOpen] = useState(false);

    const handleStatusClick = (user: AdminUser) => {
        setSelectedUser(user);
        setDialogOpen(true);
    };

    const handleConfirm = () => {
        if (!selectedUser) return;

        const nextStatus =
            selectedUser.status === "ACTIVE"
                ? "BANNED"
                : "ACTIVE";

        startTransition(async () => {
            const result = await updateUserStatus(
                selectedUser.id,
                nextStatus
            );

            if (result.success) {
                toast.success(result.message);

                setDialogOpen(false);
                setSelectedUser(null);
            } else {
                toast.error(result.message);
            }
        });
    };

    if (!users.length) {
        return (
            <div className="rounded-2xl border border-dashed p-10 text-center">
                <p className="font-medium">
                    No users found
                </p>

                <p className="mt-1 text-sm text-muted-foreground">
                    There are no users to display.
                </p>
            </div>
        );
    }

    const isBanning = selectedUser?.status === "ACTIVE";

    return (
        <>
            <div className="overflow-hidden rounded-2xl border bg-card">
                <div className="overflow-x-auto">
                    <table className="w-full min-w-[800px] text-sm">
                        <thead className="border-b bg-muted/50">
                            <tr>
                                <th className="px-5 py-4 text-left font-semibold">
                                    User
                                </th>

                                <th className="px-5 py-4 text-left font-semibold">
                                    Role
                                </th>

                                <th className="px-5 py-4 text-left font-semibold">
                                    Status
                                </th>

                                <th className="px-5 py-4 text-left font-semibold">
                                    Joined
                                </th>

                                <th className="px-5 py-4 text-right font-semibold">
                                    Action
                                </th>
                            </tr>
                        </thead>

                        <tbody>
                            {users.map((user) => (
                                <tr
                                    key={user.id}
                                    className="border-b last:border-0 hover:bg-muted/30"
                                >
                                    <td className="px-5 py-4">
                                        <div>
                                            <p className="font-medium">
                                                {user.name}
                                            </p>

                                            <p className="text-xs text-muted-foreground">
                                                {user.email}
                                            </p>
                                        </div>
                                    </td>

                                    <td className="px-5 py-4">
                                        <Badge variant="outline">
                                            {user.role}
                                        </Badge>
                                    </td>

                                    <td className="px-5 py-4">
                                        {user.status === "ACTIVE" ? (
                                            <Badge className="bg-green-100 text-green-700 hover:bg-green-100">
                                                Active
                                            </Badge>
                                        ) : (
                                            <Badge className="bg-red-100 text-red-700 hover:bg-red-100">
                                                Banned
                                            </Badge>
                                        )}
                                    </td>

                                    <td className="px-5 py-4 text-muted-foreground">
                                        {new Date(
                                            user.createdAt
                                        ).toLocaleDateString()}
                                    </td>

                                    <td className="px-5 py-4 text-right">
                                        <Button
                                            variant={
                                                user.status === "ACTIVE"
                                                    ? "destructive"
                                                    : "outline"
                                            }
                                            size="sm"
                                            disabled={pending}
                                            onClick={() =>
                                                handleStatusClick(user)
                                            }
                                        >
                                            {user.status === "ACTIVE"
                                                ? "Ban"
                                                : "Unban"}
                                        </Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            <AlertDialog
                open={dialogOpen}
                onOpenChange={setDialogOpen}
            >
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>
                            {isBanning
                                ? "Ban this user?"
                                : "Unban this user?"}
                        </AlertDialogTitle>

                        <AlertDialogDescription>
                            {isBanning ? (
                                <>
                                    You are about to ban{" "}
                                    <strong>
                                        {selectedUser?.name}
                                    </strong>
                                    . This user will no longer be able to
                                    access the platform normally.
                                </>
                            ) : (
                                <>
                                    You are about to unban{" "}
                                    <strong>
                                        {selectedUser?.name}
                                    </strong>
                                    . This will restore the user&apos;s access
                                    to the platform.
                                </>
                            )}
                        </AlertDialogDescription>
                    </AlertDialogHeader>

                    <AlertDialogFooter>
                        <AlertDialogCancel disabled={pending}>
                            Cancel
                        </AlertDialogCancel>

                        <AlertDialogAction
                            onClick={handleConfirm}
                            disabled={pending}
                            className={
                                isBanning
                                    ? "bg-destructive text-destructive-foreground hover:bg-destructive/90"
                                    : ""
                            }
                        >
                            {pending
                                ? "Processing..."
                                : isBanning
                                    ? "Yes, Ban User"
                                    : "Yes, Unban User"}
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </>
    );
}