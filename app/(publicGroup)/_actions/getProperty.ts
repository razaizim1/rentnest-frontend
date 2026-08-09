"use server";

export const getProperty = async (id: string) => {
    const res = await fetch(`${process.env.BACKEND_API_URL}/api/properties/${id}`);
    const result = await res.json();
    return result;
}