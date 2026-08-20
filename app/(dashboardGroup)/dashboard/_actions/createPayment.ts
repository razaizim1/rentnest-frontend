"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export type PaymentState = {
    success: boolean;
    statusCode?: number;
    message: string;
};

export const createPayment = async (
    _prevState: PaymentState | null,
    formData: FormData
): Promise<PaymentState> => {
    let paymentUrl: string | undefined;

    try {
        const rentalRequestId = formData.get("rentalRequestId")?.toString();

        if (!rentalRequestId) {
            return {
                success: false,
                statusCode: 400,
                message: "Rental request information is missing.",
            };
        }

        const cookieStore = await cookies();
        const accessToken = cookieStore.get("accessToken")?.value;

        if (!accessToken) {
            return {
                success: false,
                statusCode: 401,
                message: "Please login to make a payment.",
            };
        }

        const res = await fetch(
            `${process.env.BACKEND_API_URL}/api/payments/create`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${accessToken}`,
                },
                body: JSON.stringify({
                    rentalRequestId,
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
                    "Unable to start the payment process.",
            };
        }

        paymentUrl = result.data?.paymentUrl;

        if (!paymentUrl) {
            return {
                success: false,
                statusCode: 500,
                message: "Payment checkout URL was not returned.",
            };
        }
    } catch (error) {
        console.error("Create payment error:", error);

        return {
            success: false,
            statusCode: 500,
            message:
                "Something went wrong while starting the payment. Please try again.",
        };
    }

    redirect(paymentUrl);
};
