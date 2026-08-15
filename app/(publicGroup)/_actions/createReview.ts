"use server";

import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";

export type CreateReviewState = {
    success: boolean;
    statusCode?: number;
    message: string;
    data?: unknown;
};

export const createReview = async (
    propertyId: string,
    _prevState: CreateReviewState,
    formData: FormData
): Promise<CreateReviewState> => {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get("accessToken")?.value;

    if (!accessToken) {
        return {
            success: false,
            statusCode: 401,
            message: "Please login to submit a review.",
        };
    }

    const rating = Number(formData.get("rating"));
    const comment = formData.get("comment")?.toString().trim();

    // Client-side + server action validation
    if (!rating || rating < 1 || rating > 5) {
        return {
            success: false,
            statusCode: 400,
            message: "Please select a rating between 1 and 5.",
        };
    }

    if (!comment) {
        return {
            success: false,
            statusCode: 400,
            message: "Review comment is required.",
        };
    }

    if (comment.length < 5) {
        return {
            success: false,
            statusCode: 400,
            message: "Review must contain at least 5 characters.",
        };
    }

    try {
        const res = await fetch(
            `${process.env.BACKEND_API_URL}/api/reviews`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${accessToken}`,
                },
                body: JSON.stringify({
                    propertyId,
                    rating,
                    comment,
                }),
            }
        );

        const result = await res.json();

        if (!res.ok || !result.success) {
            return {
                success: false,
                statusCode: res.status,
                message:
                    result.message || "Failed to submit review.",
            };
        }

        revalidatePath(`/properties/${propertyId}`);

        return {
            success: true,
            statusCode: result.statusCode,
            message:
                result.message || "Review submitted successfully.",
            data: result.data,
        };
    } catch (error) {
        console.error("Create review error:", error);

        return {
            success: false,
            statusCode: 500,
            message:
                "Something went wrong while submitting your review.",
        };
    }
};