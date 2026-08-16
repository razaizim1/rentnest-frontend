"use server";

export const getProperty = async (id: string) => {
    try {
        const res = await fetch(
            `${process.env.BACKEND_API_URL}/api/properties/${id}`,
            {
                method: "GET",
                cache: "no-store",
            }
        );

        const result = await res.json();

        if (!res.ok || !result.success) {
            return {
                success: false,
                statusCode: res.status,
                message:
                    result.message ||
                    "Property not found.",
                data: null,
            };
        }

        return result;
    } catch (error) {
        console.error("Get property error:", error);

        return {
            success: false,
            statusCode: 500,
            message:
                "Unable to load this property right now. Please try again.",
            data: null,
        };
    }
};