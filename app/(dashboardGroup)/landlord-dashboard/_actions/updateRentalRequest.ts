"use server";

import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";

type RentalStatus = "APPROVED" | "REJECTED";

export const updateRentalRequest = async (
    rentalId: string,
    status: RentalStatus
) => {
    try {
        if (!rentalId) {
            return {
                success: false,
                statusCode: 400,
                message: "Rental request ID is required.",
            };
        }

        if (!["APPROVED", "REJECTED"].includes(status)) {
            return {
                success: false,
                statusCode: 400,
                message: "Invalid rental request status.",
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
            `${process.env.BACKEND_API_URL}/api/landlord/requests/${rentalId}`,
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
                        status === "APPROVED"
                            ? "approve"
                            : "reject"
                    } rental request.`,
            };
        }

        revalidatePath("/landlord-dashboard");
        revalidatePath("/landlord-dashboard/requests");
        revalidatePath("/dashboard");

        return {
            success: true,
            statusCode: result.statusCode,
            message:
                result.message ||
                `Rental request ${
                    status === "APPROVED"
                        ? "approved"
                        : "rejected"
                } successfully.`,
            data: result.data,
        };
    } catch (error) {
        console.error(
            "Update rental request error:",
            error
        );

        return {
            success: false,
            statusCode: 500,
            message:
                `Unable to ${
                    status === "APPROVED"
                        ? "approve"
                        : "reject"
                } the rental request right now. Please try again.`,
        };
    }
};