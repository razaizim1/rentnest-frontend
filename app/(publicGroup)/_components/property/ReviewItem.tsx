"use client";

import { useTransition } from "react";
import { Star, Trash2 } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";

import { deleteReview } from "../../_actions/deleteReview";

import { IReview } from "@/lib/types";

type ReviewItemProps = {
    review: IReview;
    propertyId: string;
    currentUserId?: string;
};

export function ReviewItem({
    review,
    propertyId,
    currentUserId,
}: ReviewItemProps) {
    const [pending, startTransition] = useTransition();

    const isOwner =
        currentUserId === review.tenant.id;

    const handleDelete = () => {
        const confirmed = window.confirm(
            "Are you sure you want to delete this review?"
        );

        if (!confirmed) return;

        startTransition(async () => {
            const result = await deleteReview(
                review.id,
                propertyId
            );

            if (result.success) {
                toast.success(result.message);
            } else {
                toast.error(result.message);
            }
        });
    };

    return (
        <div className="rounded-xl border p-5">
            <div className="flex items-start justify-between gap-4">
                <div>
                    <h4 className="font-semibold">
                        {review.tenant?.name || "Anonymous"}
                    </h4>

                    <p className="mt-1 text-xs text-muted-foreground">
                        {new Date(
                            review.createdAt
                        ).toLocaleDateString()}
                    </p>
                </div>

                {isOwner && (
                    <Button
                        variant="ghost"
                        size="sm"
                        disabled={pending}
                        onClick={handleDelete}
                        className="text-destructive hover:text-destructive"
                    >
                        <Trash2 className="mr-1 h-4 w-4" />

                        {pending
                            ? "Deleting..."
                            : "Delete"}
                    </Button>
                )}
            </div>

            {/* Rating */}
            <div className="mt-3 flex items-center gap-1">
                {Array.from({ length: 5 }).map(
                    (_, index) => (
                        <Star
                            key={index}
                            size={16}
                            className={
                                index < review.rating
                                    ? "fill-yellow-400 text-yellow-400"
                                    : "text-muted-foreground"
                            }
                        />
                    )
                )}
            </div>

            {/* Comment */}
            <p className="mt-4 text-sm leading-6 text-muted-foreground">
                {review.comment}
            </p>
        </div>
    );
}