"use server";

import { IReview } from "@/lib/types";

export type GetPropertyReviewsResponse = {
    success: boolean;
    statusCode?: number;
    message: string;
    data: IReview[];
};

export const getPropertyReviews = async (
    propertyId: string
): Promise<GetPropertyReviewsResponse> => {
    try {
        const res = await fetch(
            `${process.env.BACKEND_API_URL}/api/properties/${propertyId}/reviews`,
            {
                method: "GET",
                cache: "no-store",
            }
        );

        const result = await res.json();

        if (!res.ok || !result.success) {
            return {
                success: false,
                statusCode: res.status,
                message:
                    result.message || "Failed to load reviews.",
                data: [],
            };
        }

        return {
            success: true,
            statusCode: result.statusCode,
            message: result.message || "Reviews loaded successfully.",
            data: result.data ?? [],
        };
    } catch (error) {
        console.error("Get property reviews error:", error);

        return {
            success: false,
            statusCode: 500,
            message: "Failed to load property reviews.",
            data: [],
        };
    }
};