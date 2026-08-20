import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { JwtPayload } from "jsonwebtoken";
import { jwtUtils } from "./utils/jwt";
import { getNewAccessToken } from "./service/refreshToken";

const AUTH_ROUTES = ["/login", "/register"];
const PUBLIC_PREFIXES = [
    "/",
    "/properties",
    "/login",
    "/register",
    "/payment",
    "/about",
    "/contact",
];

const cookieOptions = {
    httpOnly: true,
    maxAge: 60 * 60 * 24,
    sameSite: "lax" as const,
    secure: process.env.NODE_ENV === "production",
};

function applyAuthCookies(
    response: NextResponse,
    options: {
        accessToken?: string;
        clearAccessToken?: boolean;
    }
) {
    if (options.accessToken) {
        response.cookies.set("accessToken", options.accessToken, cookieOptions);
    }

    if (options.clearAccessToken) {
        response.cookies.delete("accessToken");
    }

    return response;
}

function roleHome(role: string | null) {
    if (role === "TENANT") return "/dashboard";
    if (role === "LANDLORD") return "/landlord-dashboard";
    if (role === "ADMIN") return "/admin-dashboard";
    return "/";
}

export async function proxy(request: NextRequest) {
    const pathname = request.nextUrl.pathname;

    let accessToken = request.cookies.get("accessToken")?.value;
    const refreshToken = request.cookies.get("refreshToken")?.value;

    let decodedAccessToken = accessToken
        ? jwtUtils.verifyToken(
              accessToken,
              process.env.JWT_ACCESS_SECRET as string
          )
        : null;

    const decodedRefreshToken = refreshToken
        ? jwtUtils.verifyToken(
              refreshToken,
              process.env.JWT_REFRESH_SECRET as string
          )
        : null;

    let refreshedAccessToken: string | undefined;
    let clearAccessToken = false;

    if (!decodedAccessToken?.success && decodedRefreshToken?.success) {
        const result = await getNewAccessToken(refreshToken);

        if (result.success) {
            refreshedAccessToken = result.data.accessToken;
            accessToken = refreshedAccessToken;
            decodedAccessToken = jwtUtils.verifyToken(
                accessToken!,
                process.env.JWT_ACCESS_SECRET as string
            );
        }
    }

    if (!decodedAccessToken?.success) {
        clearAccessToken = true;
        accessToken = undefined;
    }

    let userRole: string | null = null;

    if (decodedAccessToken?.success && decodedAccessToken.data) {
        userRole = (decodedAccessToken.data as JwtPayload).role;
    }

    const redirectTo = (path: string) =>
        applyAuthCookies(NextResponse.redirect(new URL(path, request.url)), {
            accessToken: refreshedAccessToken,
            clearAccessToken,
        });

    if (accessToken && AUTH_ROUTES.includes(pathname)) {
        return redirectTo(roleHome(userRole));
    }

    const isRentRoute = /^\/properties\/[^/]+\/rent$/.test(pathname);
    const isAuthRoute = AUTH_ROUTES.some(
        (route) => pathname === route || pathname.startsWith(`${route}/`)
    );
    const isPublicRoute =
        !isRentRoute &&
        PUBLIC_PREFIXES.some(
            (route) =>
                pathname === route ||
                (route !== "/" && pathname.startsWith(`${route}/`))
        );

    if (!accessToken && !isPublicRoute && !isAuthRoute) {
        return redirectTo("/login");
    }

    if (isRentRoute && userRole !== "TENANT") {
        return redirectTo(accessToken ? roleHome(userRole) : "/login");
    }

    if (pathname.startsWith("/dashboard") && userRole !== "TENANT") {
        return redirectTo(roleHome(userRole));
    }

    if (
        pathname.startsWith("/landlord-dashboard") &&
        userRole !== "LANDLORD"
    ) {
        return redirectTo(roleHome(userRole));
    }

    if (pathname.startsWith("/admin-dashboard") && userRole !== "ADMIN") {
        return redirectTo(roleHome(userRole));
    }

    return applyAuthCookies(NextResponse.next(), {
        accessToken: refreshedAccessToken,
        clearAccessToken,
    });
}

export const config = {
    matcher: [
        "/((?!api|_next/static|favicon.ico|_next/image|.*\\.png$).*)",
    ],
};
