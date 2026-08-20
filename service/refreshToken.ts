"use server";

import { cookies } from "next/headers";

export const getNewAccessToken = async (refreshTokenValue?: string) => {
    const cookieStore = await cookies();
    const refreshToken =
        refreshTokenValue || cookieStore.get("refreshToken")?.value || null;

    if (!refreshToken) {
        return {
            success: false,
            message: "Refresh token not found!",
        };
    }

    const res = await fetch(
        `${process.env.BACKEND_API_URL}/api/auth/refresh-token`,
        {
            method: "POST",
            headers: {
                Cookie: `refreshToken=${refreshToken}`,
            },
            cache: "no-store",
        }
    );

    const result = await res.json();

    return result;
};
