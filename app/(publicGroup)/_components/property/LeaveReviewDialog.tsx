"use client";

import { useState } from "react";

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";

import { ReviewForm } from "./ReviewForm";

type LeaveReviewDialogProps = {
    propertyId: string;
};

export function LeaveReviewDialog({
    propertyId,
}: LeaveReviewDialogProps) {
    const [open, setOpen] = useState(false);

    return (
        <Dialog
            open={open}
            onOpenChange={setOpen}
        >
            <DialogTrigger asChild>
                <Button className="flex-1">
                    Leave Review
                </Button>
            </DialogTrigger>

            <DialogContent className="sm:max-w-lg">
                <DialogHeader>
                    <DialogTitle>
                        Leave a Review
                    </DialogTitle>
                </DialogHeader>

                <ReviewForm
                    propertyId={propertyId}
                    onSuccess={() => setOpen(false)}
                />
            </DialogContent>
        </Dialog>
    );
}