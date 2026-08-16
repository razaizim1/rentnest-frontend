"use server";

import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";

export const deleteReview = async (
    reviewId: string,
    propertyId: string
) => {
    try {
        if (!reviewId) {
            return {
                success: false,
                statusCode: 400,
                message: "Review ID is required.",
            };
        }

        if (!propertyId) {
            return {
                success: false,
                statusCode: 400,
                message: "Property ID is required.",
            };
        }

        const cookieStore = await cookies();

        const accessToken =
            cookieStore.get("accessToken")?.value;

        if (!accessToken) {
            return {
                success: false,
                statusCode: 401,
                message: "Please login to delete your review.",
            };
        }

        const res = await fetch(
            `${process.env.BACKEND_API_URL}/api/reviews/${reviewId}`,
            {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            }
        );

        const result = await res.json();

        if (!res.ok || !result.success) {
            return {
                success: false,
                statusCode: res.status,
                message:
                    result.message ||
                    "Failed to delete review.",
            };
        }

        revalidatePath(`/properties/${propertyId}`);

        return {
            success: true,
            statusCode: result.statusCode,
            message:
                result.message ||
                "Review deleted successfully.",
        };
    } catch (error) {
        console.error("Delete review error:", error);

        return {
            success: false,
            statusCode: 500,
            message:
                "Unable to delete your review right now. Please try again.",
        };
    }
};