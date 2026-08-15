"use client";

import { useActionState, useEffect, useState } from "react";
import { Star } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

import {
    createReview,
    CreateReviewState,
} from "../../_actions/createReview";

type ReviewFormProps = {
    propertyId: string;
    onSuccess?: () => void;
};

const initialState: CreateReviewState = {
    success: false,
    message: "",
};

export function ReviewForm({
    propertyId,
    onSuccess,
}: ReviewFormProps) {
    const [rating, setRating] = useState(0);

    const createReviewWithId = createReview.bind(
        null,
        propertyId
    );

    const [state, action, pending] = useActionState(
        createReviewWithId,
        initialState
    );

    useEffect(() => {
        if (!state.message) return;

        if (state.success) {
            toast.success(state.message);
            onSuccess?.();
        } else {
            toast.error(state.message);
        }
    }, [state, onSuccess]);

    return (
        <form action={action} className="space-y-5">
            {/* Rating */}
            <div className="space-y-3">
                <label className="text-sm font-medium">
                    Your Rating
                </label>

                <div className="flex items-center gap-2">
                    {[1, 2, 3, 4, 5].map((value) => {
                        const active = value <= rating;

                        return (
                            <button
                                key={value}
                                type="button"
                                onClick={() => setRating(value)}
                                className="rounded-md p-1 transition hover:bg-muted"
                                aria-label={`Rate ${value} out of 5`}
                            >
                                <Star
                                    size={26}
                                    className={
                                        active
                                            ? "fill-yellow-400 text-yellow-400"
                                            : "text-muted-foreground"
                                    }
                                />
                            </button>
                        );
                    })}
                </div>

                {/* Important: hidden field for Server Action */}
                <input
                    type="hidden"
                    name="rating"
                    value={rating}
                />
            </div>

            {/* Comment */}
            <div className="space-y-2">
                <label className="text-sm font-medium">
                    Your Review
                </label>

                <Textarea
                    name="comment"
                    placeholder="Share your experience with this property..."
                    rows={5}
                    required
                />
            </div>

            {/* Validation message */}
            {!state.success && state.message && (
                <p className="text-sm text-destructive">
                    {state.message}
                </p>
            )}

            <Button
                type="submit"
                disabled={pending || rating === 0}
            >
                {pending ? "Submitting..." : "Submit Review"}
            </Button>
        </form>
    );
}