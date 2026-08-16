"use server";

import { cookies } from "next/headers";

export const getAdminRentals = async () => {
    const cookieStore = await cookies();
    const accessToken =
        cookieStore.get("accessToken")?.value;

    if (!accessToken) {
        return {
            success: false,
            message: "Unauthorized",
            data: [],
        };
    }

    try {
        const res = await fetch(
            `${process.env.BACKEND_API_URL}/api/admin/rentals`,
            {
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
                message:
                    result.message ||
                    "Failed to load rental requests.",
                data: [],
            };
        }

        return result;
    } catch (error) {
        console.error(
            "Get admin rentals error:",
            error
        );

        return {
            success: false,
            message:
                "Failed to load rental requests.",
            data: [],
        };
    }
};