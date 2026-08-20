"use server";

import { cookies } from "next/headers";
import { rethrowIfNextInternal } from "@/lib/rethrowIfNextInternal";

export const getLandlordRequests = async () => {
    try {
        const cookieStore = await cookies();

        const accessToken =
            cookieStore.get("accessToken")?.value;

        if (!accessToken) {
            return {
                success: false,
                statusCode: 401,
                message: "Please login to view rental requests.",
                data: [],
            };
        }

        const res = await fetch(
            `${process.env.BACKEND_API_URL}/api/landlord/requests`,
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
                    "Failed to load rental requests.",
                data: [],
            };
        }

        return {
            success: true,
            statusCode: result.statusCode,
            message:
                result.message ||
                "Rental requests loaded successfully.",
            data: result.data ?? [],
        };
    } catch (error) {
        rethrowIfNextInternal(error);
        console.error(
            "Get landlord requests error:",
            error
        );

        return {
            success: false,
            statusCode: 500,
            message:
                "Unable to load rental requests right now. Please try again.",
            data: [],
        };
    }
};