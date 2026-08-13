"use server";

import { cookies } from "next/headers";

export const getMyProperties = async () => {
    const cookieStore = await cookies();

    const accessToken = cookieStore.get("accessToken")?.value;

    if (!accessToken) {
        return {
            success: false,
            message: "Unauthorized",
            data: [],
        };
    }

    const res = await fetch(
        `${process.env.BACKEND_API_URL}/api/landlord/properties`,
        {
            method: "GET",
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
            cache: "no-store",
        }
    );

    const result = await res.json();

    return result;
};