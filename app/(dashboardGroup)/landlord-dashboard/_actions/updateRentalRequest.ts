"use server";

import { cookies } from "next/headers";

type UpdateRentalRequestResult = {
    success: boolean;
    message: string;
};

export const updateRentalRequest = async (
    requestId: string,
    status: "APPROVED" | "REJECTED"
): Promise<UpdateRentalRequestResult> => {
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
            `${process.env.BACKEND_API_URL}/api/landlord/requests/${requestId}`,
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
                    result.message || "Failed to update rental request.",
            };
        }

        return {
            success: true,
            message:
                result.message ||
                `Rental request ${status.toLowerCase()} successfully.`,
        };
    } catch {
        return {
            success: false,
            message:
                "Something went wrong while updating the rental request.",
        };
    }
};