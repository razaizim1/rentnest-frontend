"use client";

import { useState, useTransition } from "react";
import { Trash2 } from "lucide-react";
import { toast } from "sonner";

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

import { Button } from "@/components/ui/button";
import { deleteProperty } from "../_actions/deleteProperty";

type DeletePropertyButtonProps = {
    propertyId: string;
};

export function DeletePropertyButton({
    propertyId,
}: DeletePropertyButtonProps) {
    const [open, setOpen] = useState(false);
    const [pending, startTransition] = useTransition();

    const handleDelete = () => {
        startTransition(async () => {
            const result = await deleteProperty(propertyId);

            if (!result.success) {
                toast.error(result.message);
                return;
            }

            toast.success(result.message);
            setOpen(false);

            window.location.reload();
        });
    };

    return (
        <>
            <Button
                type="button"
                variant="destructive"
                className="flex-1"
                onClick={() => setOpen(true)}
                disabled={pending}
            >
                <Trash2 className="mr-2 h-4 w-4" />
                Delete
            </Button>

            <AlertDialog
                open={open}
                onOpenChange={setOpen}
            >
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>
                            Delete Property?
                        </AlertDialogTitle>

                        <AlertDialogDescription>
                            This action cannot be undone. This property
                            will be permanently removed from your listings.
                        </AlertDialogDescription>
                    </AlertDialogHeader>

                    <AlertDialogFooter>
                        <AlertDialogCancel disabled={pending}>
                            Cancel
                        </AlertDialogCancel>

                        <AlertDialogAction
                            onClick={handleDelete}
                            disabled={pending}
                            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                        >
                            {pending
                                ? "Deleting..."
                                : "Yes, Delete"}
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </>
    );
}