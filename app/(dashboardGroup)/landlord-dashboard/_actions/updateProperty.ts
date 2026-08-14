"use server";

import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";

export type UpdatePropertyState = {
    success: boolean;
    message: string;
};

export const updateProperty = async (
    propertyId: string,
    _prevState: UpdatePropertyState,
    formData: FormData
): Promise<UpdatePropertyState> => {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get("accessToken")?.value;

    if (!accessToken) {
        return {
            success: false,
            message: "You must be logged in.",
        };
    }

    const amenities = formData
        .getAll("amenities")
        .map((item) => item.toString());

    const payload = {
        title: formData.get("title")?.toString(),
        description: formData.get("description")?.toString(),
        location: formData.get("location")?.toString(),
        address: formData.get("address")?.toString(),
        rentAmount: Number(formData.get("rentAmount")),
        bedrooms: Number(formData.get("bedrooms")),
        bathrooms: Number(formData.get("bathrooms")),
        area: Number(formData.get("area")) || undefined,
        image: formData.get("image")?.toString(),
        categoryId: formData.get("categoryId")?.toString(),
        amenities,
    };

    try {
        const res = await fetch(
            `${process.env.BACKEND_API_URL}/api/landlord/properties/${propertyId}`,
            {
                method: "PUT",
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
                message:
                    result.message || "Failed to update property.",
            };
        }

        revalidatePath("/landlord-dashboard");
        revalidatePath("/landlord-dashboard/properties");
        revalidatePath("/properties");
        revalidatePath(`/properties/${propertyId}`);

        return {
            success: true,
            message: "Property updated successfully.",
        };
    } catch {
        return {
            success: false,
            message: "Something went wrong while updating the property.",
        };
    }
};