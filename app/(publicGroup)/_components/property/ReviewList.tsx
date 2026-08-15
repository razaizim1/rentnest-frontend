import { Star } from "lucide-react";

import { IReview } from "@/lib/types";
import { getPropertyReviews } from "../../_actions/getPropertyReviews";

type ReviewListProps = {
    propertyId: string;
};

export async function ReviewList({
    propertyId,
}: ReviewListProps) {
    const result = await getPropertyReviews(propertyId);

    const reviews: IReview[] = result?.data ?? [];

    if (!reviews.length) {
        return (
            <div className="rounded-xl border border-dashed p-8 text-center">
                <p className="font-medium">No reviews yet</p>

                <p className="mt-1 text-sm text-muted-foreground">
                    Be the first tenant to review this property.
                </p>
            </div>
        );
    }

    return (
        <div className="space-y-5">
            {reviews.map((review) => (
                <div
                    key={review.id}
                    className="rounded-xl border p-5"
                >
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

                        <div className="flex items-center gap-1">
                            <Star
                                size={16}
                                className="fill-yellow-400 text-yellow-400"
                            />
                            <span className="text-sm font-semibold">
                                {review.rating}
                            </span>
                        </div>
                    </div>

                    <p className="mt-4 text-sm leading-6 text-muted-foreground">
                        {review.comment}
                    </p>
                </div>
            ))}
        </div>
    );
}