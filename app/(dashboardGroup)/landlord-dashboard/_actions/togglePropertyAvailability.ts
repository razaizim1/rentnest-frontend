"use server";

import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";

export const togglePropertyAvailability = async (
    propertyId: string,
    available: boolean
) => {
    try {
        const cookieStore = await cookies();
        const accessToken = cookieStore.get("accessToken")?.value;

        if (!accessToken) {
            return {
                success: false,
                message: "Please login as a landlord.",
            };
        }

        const res = await fetch(
            `${process.env.BACKEND_API_URL}/api/landlord/properties/${propertyId}`,
            {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${accessToken}`,
                },
                body: JSON.stringify({ available }),
            }
        );

        const result = await res.json();

        if (!res.ok || !result.success) {
            return {
                success: false,
                message:
                    result.message ||
                    "Failed to update property availability.",
            };
        }

        revalidatePath("/landlord-dashboard");
        revalidatePath("/landlord-dashboard/properties");
        revalidatePath("/properties");
        revalidatePath(`/properties/${propertyId}`);

        return {
            success: true,
            message: available
                ? "Property marked as available."
                : "Property marked as unavailable.",
        };
    } catch (error) {
        console.error("Toggle availability error:", error);

        return {
            success: false,
            message: "Unable to update availability right now.",
        };
    }
};
