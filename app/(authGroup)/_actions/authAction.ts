"use server"

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import jwt, { JwtPayload } from "jsonwebtoken";

type SignInState = {
    success: boolean;
    statusCode: number;
    message: string;
    data: {
        accessToken: string;
        refreshToken: string;
    }
}
export const singInFrom = async (prevState: SignInState, formData: FormData) => {

    const email = formData.get('email');
    const password = formData.get('password');

    const payload = {
        email,
        password
    }

    const res = await fetch(`${process.env.BACKEND_API_URL}/api/auth/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
    })
    const result = await res.json();
    if (result.success) {
        const cookieStore = await cookies();
        const isProduction = process.env.NODE_ENV === "production";

        cookieStore.set('accessToken', result.data.accessToken, {
            httpOnly: true,
            secure: isProduction,
            maxAge: 60 * 60 * 24,
            sameSite: 'lax',
        });
        cookieStore.set('refreshToken', result.data.refreshToken, {
            httpOnly: true,
            secure: isProduction,
            maxAge: 60 * 60 * 24 * 7,
            sameSite: 'lax',
        });

        const decodedToken = jwt.decode(result.data.accessToken) as JwtPayload;

        if (decodedToken.role === "ADMIN") {
            redirect("/admin-dashboard", "replace");
        } else if (decodedToken.role === "LANDLORD") {
            redirect("/landlord-dashboard", "replace");
        } else {
            redirect("/dashboard", "replace");
        }

        // redirect("/", "replace");

    }
    return result;
}

type RegisterState = {
    success: boolean;
    statusCode: number;
    message: string;
    data: {
        "name": string;
        "email": string;
        "phone": string;
        "avatar": string;
        "role": string;
        "status": string;
        "createdAt": string;
    }
}

export const registerForm = async (prevState: RegisterState, formData: FormData) => {
    try {
        // const allEntries = Object.fromEntries(formData.entries());
        // console.log("📋 All FormData entries:", allEntries);

        const email = formData.get('email');
        const password = formData.get('password')?.toString() || '';
        const name = formData.get('name');
        const phone = formData.get('phone');
        const avatar = formData.get('avatar');
        const role = formData.get('role');

        if (!name || !email || !password) {
            return {
                success: false,
                statusCode: 400,
                message: "Name, email, and password are required.",
                data: prevState.data
            };
        }

        if (password.length < 6) {
            return {
                success: false,
                statusCode: 400,
                message: "Password must be at least 6 characters.",
                data: prevState.data
            };
        }

        const payload = {
            name,
            phone,
            avatar,
            email,
            password,
            role
        }

        // POST to example API
        const res = await fetch(`${process.env.BACKEND_API_URL}/api/auth/register`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(payload)
        });

        const result = await res.json();

        if (res.ok) {
            // Return success state first so toast can show
            return {
                success: true,
                statusCode: res.status,
                message: result.message || "Registration successful!",
                data: result.data || prevState.data
            };
        }

        return {
            success: false,
            statusCode: res.status,
            message: result.message || "Registration failed. Please try again.",
            data: prevState.data
        };
    } catch (error) {
        console.error("❌ Registration error:", error);
        return {
            success: false,
            statusCode: 500,
            message: "Something went wrong. Please try again.",
            data: prevState.data
        };
    }
}