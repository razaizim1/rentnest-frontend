"use server";

import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";

export const deleteProperty = async (
    propertyId: string
) => {
    try {
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
                message: "Please login as a landlord.",
            };
        }

        const res = await fetch(
            `${process.env.BACKEND_API_URL}/api/landlord/properties/${propertyId}`,
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
                    "Failed to delete property.",
            };
        }

        revalidatePath("/landlord-dashboard");
        revalidatePath("/landlord-dashboard/properties");
        revalidatePath("/properties");

        return {
            success: true,
            statusCode: result.statusCode,
            message:
                result.message ||
                "Property deleted successfully.",
        };
    } catch (error) {
        console.error("Delete property error:", error);

        return {
            success: false,
            statusCode: 500,
            message:
                "Unable to delete property right now. Please try again.",
        };
    }
};