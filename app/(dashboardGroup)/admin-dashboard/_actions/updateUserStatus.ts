"use server";

import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";

type UserStatus = "ACTIVE" | "BANNED";

export const updateUserStatus = async (
    userId: string,
    status: UserStatus
) => {
    try {
        if (!userId) {
            return {
                success: false,
                statusCode: 400,
                message: "User ID is required.",
            };
        }

        if (!["ACTIVE", "BANNED"].includes(status)) {
            return {
                success: false,
                statusCode: 400,
                message: "Invalid user status.",
            };
        }

        const cookieStore = await cookies();

        const accessToken =
            cookieStore.get("accessToken")?.value;

        if (!accessToken) {
            return {
                success: false,
                statusCode: 401,
                message: "Please login as an administrator.",
            };
        }

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
                statusCode: res.status,
                message:
                    result.message ||
                    `Failed to ${
                        status === "BANNED"
                            ? "ban"
                            : "unban"
                    } user.`,
            };
        }

        revalidatePath("/admin-dashboard/users");

        return {
            success: true,
            statusCode: result.statusCode,
            message:
                result.message ||
                `User ${
                    status === "BANNED"
                        ? "banned"
                        : "unbanned"
                } successfully.`,
            data: result.data,
        };
    } catch (error) {
        console.error(
            "Update user status error:",
            error
        );

        return {
            success: false,
            statusCode: 500,
            message:
                "Unable to update user status right now. Please try again.",
        };
    }
};