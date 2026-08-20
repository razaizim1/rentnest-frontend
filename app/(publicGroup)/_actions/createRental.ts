"use server";

import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";

export type RentalState = {
    success: boolean;
    message: string;
    statusCode?: number;
};


export const createRental = async (
    _prevState: RentalState,
    formData: FormData
): Promise<RentalState> => {
    try {
        const cookieStore = await cookies();

        const accessToken =
            cookieStore.get("accessToken")?.value;

        if (!accessToken) {
            return {
                success: false,
                statusCode: 401,
                message: "Please login to submit a rental request.",
            };
        }

        const payload = {
            propertyId: formData.get("propertyId"),
            moveInDate: formData.get("moveInDate"),
            message: formData.get("message"),
        };

        if (!payload.propertyId) {
            return {
                success: false,
                statusCode: 400,
                message: "Property information is missing.",
            };
        }

        if (!payload.moveInDate) {
            return {
                success: false,
                statusCode: 400,
                message: "Please select a move-in date.",
            };
        }

        const res = await fetch(
            `${process.env.BACKEND_API_URL}/api/rentals`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${accessToken}`,
                },
                body: JSON.stringify(payload),
            }
        );

        const result = await res.json();

        if (!res.ok || !result.success) {
            return {
                success: false,
                statusCode: res.status,
                message:
                    result.message ||
                    "Failed to submit rental request.",
            };
        }

        revalidatePath("/dashboard");
        revalidatePath(`/properties/${payload.propertyId}`);

        return {
            success: true,
            statusCode: result.statusCode,
            message:
                result.message ||
                "Rental request submitted successfully.",
        };
    } catch (error) {
        console.error("Create rental error:", error);

        return {
            success: false,
            statusCode: 500,
            message:
                "Unable to submit your rental request right now. Please try again.",
        };
    }
};