"use server";

import { cookies } from "next/headers";

export const getMyRentals = async() =>{
    const cookieStore = await cookies();
    const token = cookieStore.get("accessToken")?.value || null;
    const res = await fetch(`${process.env.BACKEND_API_URL}/api/rentals`,{
        method: "GET",
        headers: {
            "Authorization": `Bearer ${token}`
        },
        cache: "no-store",
    });
    const result = await res.json();
    return result;
}