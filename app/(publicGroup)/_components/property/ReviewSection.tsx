import { getPropertyReviews } from "../../_actions/getPropertyReviews";
import { ReviewForm } from "./ReviewForm";
import { ReviewItem } from "./ReviewItem";

import { IReview } from "@/lib/types";

type ReviewSectionProps = {
    propertyId: string;
    currentUser?: {
        id: string;
        role: string;
    };
    hasRequested?: boolean;
    rentalStatus?: string | null;
};

export async function ReviewSection({
    propertyId,
    currentUser,
    hasRequested = false,
    rentalStatus = null,
}: ReviewSectionProps) {
    const result =
        await getPropertyReviews(propertyId);

    const reviews: IReview[] = result?.data ?? [];

    const currentUserReview = currentUser
        ? reviews.find(
            (review) =>
                review.tenant.id === currentUser.id
        )
        : undefined;

    const canReview =
        currentUser?.role === "TENANT" &&
        hasRequested &&
        (rentalStatus === "ACTIVE" ||
            rentalStatus === "COMPLETED");

    return (
        <section id="reviews">
            <div className="space-y-8">

                {/* Review Header */}
                <div>
                    <h2 className="text-2xl font-bold">
                        Customer Reviews
                    </h2>

                    <p className="mt-2 text-sm text-muted-foreground">
                        See what tenants have to say about this property.
                    </p>
                </div>

                {/* Existing Reviews */}
                {reviews.length > 0 ? (
                    <div className="space-y-4">
                        {reviews.map((review) => (
                            <ReviewItem
                                key={review.id}
                                review={review}
                                propertyId={propertyId}
                                currentUserId={currentUser?.id}
                            />
                        ))}
                    </div>
                ) : (
                    <div className="rounded-xl border border-dashed p-6 text-center">
                        <p className="font-medium">
                            No reviews yet.
                        </p>

                        <p className="mt-1 text-sm text-muted-foreground">
                            Be the first tenant to review this property.
                        </p>
                    </div>
                )}

                {/* Leave Review */}
                {canReview && !currentUserReview && (
                    <div className="rounded-2xl border bg-card p-6">
                        <h3 className="text-xl font-semibold">
                            Leave a Review
                        </h3>

                        <p className="mt-2 text-sm text-muted-foreground">
                            Share your experience with future tenants.
                        </p>

                        <div className="mt-6">
                            <ReviewForm propertyId={propertyId} />
                        </div>
                    </div>
                )}

                {/* Already Reviewed */}
                {currentUserReview && (
                    <div className="rounded-2xl border bg-muted/30 p-5">
                        <div className="flex items-center justify-between gap-4">
                            <div>
                                <p className="font-medium">
                                    Your review
                                </p>

                                <p className="mt-1 text-sm text-muted-foreground">
                                    You have already reviewed this property.
                                </p>
                            </div>

                            <span className="text-sm font-semibold">
                                ⭐ {currentUserReview.rating}/5
                            </span>
                        </div>
                    </div>
                )}

            </div>
        </section>
    );
}