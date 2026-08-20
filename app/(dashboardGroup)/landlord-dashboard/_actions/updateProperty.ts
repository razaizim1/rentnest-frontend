"use server";

import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";

export type UpdatePropertyState = {
    success: boolean;
    statusCode?: number;
    message: string;
    data?: unknown;
};

export const updateProperty = async (
    propertyId: string,
    _prevState: UpdatePropertyState,
    formData: FormData
): Promise<UpdatePropertyState> => {
    try {
        if (!propertyId) {
            return {
                success: false,
                statusCode: 400,
                message: "Property ID is required.",
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

        const amenities = formData
            .getAll("amenities")
            .map((item) => item.toString());

        const payload = {
            title: formData.get("title")?.toString().trim(),
            description: formData
                .get("description")
                ?.toString()
                .trim(),
            location: formData
                .get("location")
                ?.toString()
                .trim(),
            address: formData
                .get("address")
                ?.toString()
                .trim(),
            image: formData.get("image")?.toString().trim(),
            rentAmount: Number(formData.get("rentAmount")),
            bedrooms: Number(formData.get("bedrooms")),
            bathrooms: Number(formData.get("bathrooms")),
            area: Number(formData.get("area")),
            categoryId: formData
                .get("categoryId")
                ?.toString(),
            amenities,
            available: formData.get("available") === "on",
        };

        if (!payload.title) {
            return {
                success: false,
                statusCode: 400,
                message: "Property title is required.",
            };
        }

        if (!payload.description) {
            return {
                success: false,
                statusCode: 400,
                message: "Property description is required.",
            };
        }

        if (!payload.location) {
            return {
                success: false,
                statusCode: 400,
                message: "Property location is required.",
            };
        }

        if (!payload.address) {
            return {
                success: false,
                statusCode: 400,
                message: "Property address is required.",
            };
        }

        if (!payload.categoryId) {
            return {
                success: false,
                statusCode: 400,
                message: "Please select a property category.",
            };
        }

        if (!payload.rentAmount || payload.rentAmount <= 0) {
            return {
                success: false,
                statusCode: 400,
                message: "Please enter a valid rent amount.",
            };
        }

        if (!payload.bedrooms || payload.bedrooms <= 0) {
            return {
                success: false,
                statusCode: 400,
                message: "Please enter a valid bedroom count.",
            };
        }

        if (!payload.bathrooms || payload.bathrooms <= 0) {
            return {
                success: false,
                statusCode: 400,
                message: "Please enter a valid bathroom count.",
            };
        }

        if (!payload.area || payload.area <= 0) {
            return {
                success: false,
                statusCode: 400,
                message: "Please enter a valid property area.",
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
                    "Failed to update property.",
            };
        }

        revalidatePath("/landlord-dashboard");
        revalidatePath("/landlord-dashboard/properties");
        revalidatePath("/properties");
        revalidatePath(`/properties/${propertyId}`);

        return {
            success: true,
            statusCode: result.statusCode,
            message:
                result.message ||
                "Property updated successfully.",
            data: result.data,
        };
    } catch (error) {
        console.error("Update property error:", error);

        return {
            success: false,
            statusCode: 500,
            message:
                "Unable to update property right now. Please try again.",
        };
    }
};