"use server";

import { cookies } from "next/headers";

type DeletePropertyState = {
    success: boolean;
    message: string;
};

export const deleteProperty = async (
    propertyId: string
): Promise<DeletePropertyState> => {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get("accessToken")?.value;

    if (!accessToken) {
        return {
            success: false,
            message: "You are not logged in.",
        };
    }

    try {
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
                message:
                    result.message || "Failed to delete property.",
            };
        }

        return {
            success: true,
            message:
                result.message || "Property deleted successfully.",
        };
    } catch {
        return {
            success: false,
            message:
                "Something went wrong while deleting the property.",
        };
    }
};