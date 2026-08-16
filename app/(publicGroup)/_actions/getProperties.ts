"use server";

import { GetPropertiesParams } from "@/lib/types";

export const getProperties = async (
    params: GetPropertiesParams = {}
) => {
    try {
        const searchParams = new URLSearchParams();

        if (params.search) {
            searchParams.set("search", params.search);
        }

        if (params.location) {
            searchParams.set("location", params.location);
        }

        if (params.price) {
            searchParams.set("price", params.price);
        }

        if (params.type) {
            searchParams.set("type", params.type);
        }

        if (params.page) {
            searchParams.set("page", params.page);
        }

        if (params.limit) {
            searchParams.set("limit", params.limit);
        }

        const query = searchParams.toString();

        const url =
            `${process.env.BACKEND_API_URL}/api/properties` +
            (query ? `?${query}` : "");

        const res = await fetch(url, {
            cache: "no-store",
        });

        const result = await res.json();

        if (!res.ok || !result.success) {
            return {
                success: false,
                statusCode: res.status,
                message:
                    result.message ||
                    "Failed to load properties.",
                data: {
                    data: [],
                    meta: {
                        page: 1,
                        pageSize: 6,
                        total: 0,
                    },
                },
            };
        }

        return result;
    } catch (error) {
        console.error("Get properties error:", error);

        return {
            success: false,
            statusCode: 500,
            message:
                "Unable to load properties right now. Please try again.",
            data: {
                data: [],
                meta: {
                    page: 1,
                    pageSize: 6,
                    total: 0,
                },
            },
        };
    }
};