"use server";

import { GetPropertiesParams } from "@/lib/types";

export const getProperties = async (params: GetPropertiesParams = {}) => {
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

    const query = searchParams.toString();

    const url = `${process.env.BACKEND_API_URL}/api/properties${query ? `?${query}` : ""
        }`;

    const res = await fetch(url, {
        cache: "no-store",
    });
    const result = await res.json();
    return result;
}