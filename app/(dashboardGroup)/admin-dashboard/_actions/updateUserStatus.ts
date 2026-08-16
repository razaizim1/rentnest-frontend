"use server";

import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";

export const updateUserStatus = async (
    userId: string,
    status: "ACTIVE" | "BANNED"
) => {
    const cookieStore = await cookies();
    const accessToken =
        cookieStore.get("accessToken")?.value;

    if (!accessToken) {
        return {
            success: false,
            message: "Unauthorized",
        };
    }

    try {
        const res = await fetch(
            `${process.env.BACKEND_API_URL}/api/admin/users/${userId}`,
            {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${accessToken}`,
                },
                body: JSON.stringify({
                    status,
                }),
            }
        );

        const result = await res.json();

        if (!res.ok || !result.success) {
            return {
                success: false,
                message:
                    result.message ||
                    "Failed to update user status.",
            };
        }

        revalidatePath("/admin-dashboard/users");

        return {
            success: true,
            message:
                result.message ||
                "User status updated successfully.",
            data: result.data,
        };
    } catch (error) {
        console.error("Update user status error:", error);

        return {
            success: false,
            message:
                "Something went wrong while updating user status.",
        };
    }
};