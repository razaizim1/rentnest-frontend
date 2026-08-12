"use server"

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const createPayment = async (_prevState: unknown, formData: FormData) => {
    const rentalRequestId = formData.get("rentalRequestId") as string | null;

    if (!rentalRequestId) {
        return {
            success: false,
            message: "Rental request ID is missing",
        };
    }

    const cookieStore = await cookies();
    const token = cookieStore.get("accessToken")?.value || null;

    const res = await fetch(`${process.env.BACKEND_API_URL}/api/payments/create`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ rentalRequestId }),
    });

    const result = await res.json();

    if (result.success && result.data?.paymentUrl) {
        redirect(result.data.paymentUrl);
    }

    return result;
}