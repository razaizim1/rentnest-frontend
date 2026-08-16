"use server";

import { cookies } from "next/headers";

export const checkRentalStatus = async (
    propertyId: string
) => {
    try {
        const cookieStore = await cookies();

        const accessToken =
            cookieStore.get("accessToken")?.value;

        // Logged-out user
        if (!accessToken) {
            return {
                success: false,
                statusCode: 401,
                message: "User is not logged in.",
                data: {
                    hasRequested: false,
                    status: null,
                },
            };
        }

        const res = await fetch(
            `${process.env.BACKEND_API_URL}/api/rentals/status/${propertyId}`,
            {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
                cache: "no-store",
            }
        );

        const result = await res.json();

        if (!res.ok || !result.success) {
            return {
                success: false,
                statusCode: res.status,
                message:
                    result.message ||
                    "Unable to check rental status.",
                data: {
                    hasRequested: false,
                    status: null,
                },
            };
        }

        return {
            success: true,
            statusCode: result.statusCode,
            message:
                result.message ||
                "Rental status retrieved successfully.",
            data: {
                hasRequested:
                    result.data?.hasRequested ?? false,
                status:
                    result.data?.status ?? null,
            },
        };
    } catch (error) {
        console.error(
            "Check rental status error:",
            error
        );

        return {
            success: false,
            statusCode: 500,
            message:
                "Unable to check rental status right now.",
            data: {
                hasRequested: false,
                status: null,
            },
        };
    }
};