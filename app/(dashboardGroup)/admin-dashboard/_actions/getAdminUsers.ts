"use server";

import { GetAdminUsersParams } from "@/lib/types";
import { cookies } from "next/headers";

export const getAdminUsers = async (
    params: GetAdminUsersParams = {}
) => {
    try {
        const searchParams = new URLSearchParams();

        if (params.page) {
            searchParams.set("page", params.page);
        }

        if (params.search) {
            searchParams.set("search", params.search);
        }

        if (params.limit) {
            searchParams.set("limit", params.limit);
        }

        const query = searchParams.toString();

        const cookieStore = await cookies();
        const accessToken =
            cookieStore.get("accessToken")?.value;

        if (!accessToken) {
            return {
                success: false,
                statusCode: 401,
                message: "Unauthorized",
                data: {
                    meta: {
                        page: 1,
                        limit: 10,
                        total: 0,
                    },
                    data: [],
                },
            };
        }

        const res = await fetch(
            `${process.env.BACKEND_API_URL}/api/admin/users${query ? `?${query}` : ""
            }`,
            {
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
                data: {
                    meta: {
                        page: 1,
                        limit: 10,
                        total: 0,
                    },
                    data: [],
                },
            };
        }

        return result;
    } catch (error) {
        console.error("Get admin users error:", error);

        return {
            success: false,
            statusCode: 500,
            message: "Failed to load users.",
            data: {
                meta: {
                    page: 1,
                    limit: 10,
                    total: 0,
                },
                data: [],
            },
        };
    }
};