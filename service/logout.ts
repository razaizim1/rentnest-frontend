"use server";

import { cookies } from "next/headers";

export const logout = async () => {
    try {
        const cookieStore = await cookies();

        cookieStore.delete("accessToken");
        cookieStore.delete("refreshToken");

        return {
            success: true,
            message: "Logged out successfully.",
        };
    } catch (error) {
        console.error("Logout error:", error);

        return {
            success: false,
            message:
                "Unable to logout right now. Please try again.",
        };
    }
};