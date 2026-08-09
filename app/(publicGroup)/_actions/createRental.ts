"use server";

import { cookies } from "next/headers";

export type RentalState = {
    success: boolean;
    message: string;
};


export const createRental = async (prevState: RentalState, formData: FormData): Promise<RentalState> => {
    const cookieStore = await cookies();
    const token = cookieStore.get("accessToken");
    const payload = Object.fromEntries(formData.entries());

    const res = await fetch(`${process.env.BACKEND_API_URL}/api/rentals`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token?.value || "" || ""}`,
        },
        body: JSON.stringify(payload),
    })

    const result = await res.json();

    return result;
}