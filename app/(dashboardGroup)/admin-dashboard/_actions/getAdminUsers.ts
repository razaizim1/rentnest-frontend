"use server";

import { cookies } from "next/headers";
import { rethrowIfNextInternal } from "@/lib/rethrowIfNextInternal";

type GetAdminUsersParams = {
    page?: string;
    limit?: string;
    search?: string;
};

export const getAdminUsers = async (
    params: GetAdminUsersParams = {}
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
                    limit: 10,
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

        if (params.search) {
            searchParams.set("search", params.search);
        }

        const query = searchParams.toString();

        const res = await fetch(
            `${process.env.BACKEND_API_URL}/api/admin/users${query ? `?${query}` : ""
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
                    "Failed to load users.",
                data: [],
                meta: {
                    page: 1,
                    limit: 10,
                    total: 0,
                },
            };
        }

        return {
            success: true,
            statusCode: result.statusCode,
            message:
                result.message ||
                "Users loaded successfully.",
            data: result.data ?? [],
            meta: result.meta ?? {
                page: 1,
                limit: 10,
                total: 0,
            },
        };
    } catch (error) {
        rethrowIfNextInternal(error);
        console.error("Get admin users error:", error);

        return {
            success: false,
            statusCode: 500,
            message:
                "Unable to load users right now. Please try again.",
            data: [],
            meta: {
                page: 1,
                limit: 10,
                total: 0,
            },
        };
    }
};