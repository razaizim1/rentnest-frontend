"use server";

import { cookies } from "next/headers";

type GetAdminPropertiesParams = {
    page?: string;
    limit?: string;
};

export const getAdminProperties = async (
    params: GetAdminPropertiesParams = {}
) => {
    try {
        const cookieStore = await cookies();

        const accessToken =
            cookieStore.get("accessToken")?.value;

        if (!accessToken) {
            return {
                success: false,
                statusCode: 401,
                message: "Please login as an administrator.",
                data: [],
                meta: {
                    page: 1,
                    pageSize: 10,
                    total: 0,
                },
            };
        }

        const searchParams = new URLSearchParams();

        if (params.page) {
            searchParams.set("page", params.page);
        }

        if (params.limit) {
            searchParams.set("limit", params.limit);
        }

        const query = searchParams.toString();

        const res = await fetch(
            `${process.env.BACKEND_API_URL}/api/admin/properties${
                query ? `?${query}` : ""
            }`,
            {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
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
                    "Failed to load properties.",
                data: [],
                meta: {
                    page: 1,
                    pageSize: 10,
                    total: 0,
                },
            };
        }

        return {
            success: true,
            statusCode: result.statusCode,
            message:
                result.message ||
                "Properties loaded successfully.",
            data: result.data ?? [],
            meta: result.meta ?? {
                page: 1,
                pageSize: 10,
                total: 0,
            },
        };
    } catch (error) {
        console.error(
            "Get admin properties error:",
            error
        );

        return {
            success: false,
            statusCode: 500,
            message:
                "Unable to load properties right now. Please try again.",
            data: [],
            meta: {
                page: 1,
                pageSize: 10,
                total: 0,
            },
        };
    }
};