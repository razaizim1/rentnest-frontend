"use server";

import { cookies } from "next/headers";

export type CreatePropertyState = {
    success: boolean;
    statusCode?: number;
    message: string;
    data?: unknown;
};

export const createProperty = async (
    prevState: CreatePropertyState,
    formData: FormData
): Promise<CreatePropertyState> => {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get("accessToken")?.value;

    if (!accessToken) {
        return {
            success: false,
            statusCode: 401,
            message: "You are not logged in.",
        };
    }

    const payload = {
        title: formData.get("title"),
        description: formData.get("description"),
        location: formData.get("location"),
        address: formData.get("address"),
        rentAmount: Number(formData.get("rentAmount")),
        bedrooms: Number(formData.get("bedrooms")),
        bathrooms: Number(formData.get("bathrooms")),
        area: formData.get("area")
            ? Number(formData.get("area"))
            : undefined,
        image: formData.get("image"),
        amenities: formData
            .getAll("amenities")
            .map((item) => String(item))
            .filter(Boolean),
        categoryId: formData.get("categoryId"),
    };

    try {
        const res = await fetch(
            `${process.env.BACKEND_API_URL}/api/landlord/properties`,
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

        return result;
    } catch {
        return {
            success: false,
            statusCode: 500,
            message: "Something went wrong while creating the property.",
        };
    }
};