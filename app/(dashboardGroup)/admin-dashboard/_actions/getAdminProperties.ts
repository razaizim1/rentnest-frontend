"use server";

import { GetAdminPropertiesParams } from "@/lib/types";
import { cookies } from "next/headers";

export const getAdminProperties = async (
    params: GetAdminPropertiesParams = {}
) => {
    const cookieStore = await cookies();
    const accessToken =
        cookieStore.get("accessToken")?.value;

    if (!accessToken) {
        return {
            success: false,
            message: "Unauthorized",
            data: {
                meta: {
                    page: 1,
                    pageSize: 10,
                    total: 0,
                },
                data: [],
            },
        };
    }

    const searchParams = new URLSearchParams();

    Object.entries(params).forEach(
        ([key, value]) => {
            if (value) {
                searchParams.set(key, value);
            }
        }
    );

    const query = searchParams.toString();

    const res = await fetch(
        `${process.env.BACKEND_API_URL}/api/admin/properties${
            query ? `?${query}` : ""
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
            message:
                result.message ||
                "Failed to load properties.",
            data: {
                meta: {
                    page: 1,
                    pageSize: 10,
                    total: 0,
                },
                data: [],
            },
        };
    }

    return result;
};