"use server";

export const getCategories = async () => {
    try {
        const res = await fetch(
            `${process.env.BACKEND_API_URL}/api/categories`,
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
                    "Failed to load property categories.",
                data: [],
            };
        }

        return {
            success: true,
            statusCode: result.statusCode,
            message:
                result.message ||
                "Categories loaded successfully.",
            data: result.data ?? [],
        };
    } catch (error) {
        console.error("Get categories error:", error);

        return {
            success: false,
            statusCode: 500,
            message:
                "Unable to load property categories right now.",
            data: [],
        };
    }
};