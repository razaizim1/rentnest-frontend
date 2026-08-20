"use client";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { logout } from "@/service/logout";
import { ThemeToggle } from "@/components/shared/ThemeToggle";

import {
    Building2,
    LayoutDashboard,
    LogOut,
    Menu,
    User,
    X,
} from "lucide-react";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { toast } from "sonner";
import { useState } from "react";
import Image from "next/image";

type IUser = {
    data: {
        id: string;
        name: string;
        email: string;
        phone: string;
        avatar: string | null;
        role: string;
        status: string;
        createdAt: string;
    };
};

type UserProps = {
    user?: IUser | null;
};

export function Navbar({ user }: UserProps) {
    const router = useRouter();
    const pathname = usePathname();
    const [mobileOpen, setMobileOpen] = useState(false);

    const dashboardLink =
        user?.data?.role === "ADMIN"
            ? "/admin-dashboard"
            : user?.data?.role === "LANDLORD"
                ? "/landlord-dashboard"
                : "/dashboard";

    const navItems = [
        { label: "Home", href: "/" },
        { label: "Properties", href: "/properties" },
        ...(user?.data
            ? [{ label: "Dashboard", href: dashboardLink }]
            : []),
    ];

    const handleLogout = async () => {
        try {
            const result = await logout();

            if (result?.success === false) {
                toast.error(result.message || "Failed to logout.");
                return;
            }

            toast.success(result?.message || "User logged out successfully!");
            setMobileOpen(false);
            router.push("/login");
            router.refresh();
        } catch (error) {
            console.error("Logout error:", error);
            toast.error("Something went wrong while logging out.");
        }
    };

    return (
        <nav className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="flex h-16 items-center justify-between">
                    <Link href="/" className="flex items-center gap-2">
                        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary text-primary-foreground">
                            <Building2 className="h-5 w-5" />
                        </div>
                        <span className="text-xl font-bold tracking-tight">
                            RentNest
                        </span>
                    </Link>

                    <div className="hidden items-center gap-8 md:flex">
                        {navItems.map((item) => {
                            const isActive =
                                item.href === "/"
                                    ? pathname === "/"
                                    : pathname.startsWith(item.href);

                            return (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    className={`relative py-1 text-sm font-medium transition-colors ${
                                        isActive
                                            ? "text-primary"
                                            : "text-muted-foreground hover:text-foreground"
                                    }`}
                                >
                                    {item.label}
                                    {isActive && (
                                        <span className="absolute inset-x-0 -bottom-2 h-0.5 rounded-full bg-primary" />
                                    )}
                                </Link>
                            );
                        })}
                    </div>

                    <div className="flex items-center gap-2">
                        <ThemeToggle />

                        {user?.data ? (
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <button
                                        type="button"
                                        className="group flex items-center gap-2 rounded-full border bg-background p-1 pr-3 transition-colors hover:bg-muted"
                                    >
                                        <div className="flex h-8 w-8 items-center justify-center overflow-hidden rounded-full bg-primary/10">
                                            {user.data.avatar ? (
                                                <Image
                                                    src={user.data.avatar}
                                                    alt={user.data.name}
                                                    width={32}
                                                    height={32}
                                                    className="h-full w-full object-cover"
                                                />
                                            ) : (
                                                <User className="h-4 w-4 text-primary" />
                                            )}
                                        </div>
                                        <div className="hidden text-left sm:block">
                                            <p className="max-w-[120px] truncate text-sm font-medium">
                                                {user.data.name}
                                            </p>
                                            <p className="text-[11px] capitalize text-muted-foreground">
                                                {user.data.role.toLowerCase()}
                                            </p>
                                        </div>
                                    </button>
                                </DropdownMenuTrigger>

                                <DropdownMenuContent align="end" sideOffset={8} className="w-64">
                                    <DropdownMenuLabel className="font-normal">
                                        <div className="flex items-center gap-3 py-1">
                                            <div className="flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-full bg-primary/10">
                                                {user.data.avatar ? (
                                                    <Image
                                                        src={user.data.avatar}
                                                        alt={user.data.name}
                                                        width={40}
                                                        height={40}
                                                        className="h-full w-full object-cover"
                                                    />
                                                ) : (
                                                    <User className="h-5 w-5 text-primary" />
                                                )}
                                            </div>
                                            <div className="min-w-0">
                                                <p className="truncate text-sm font-semibold">
                                                    {user.data.name}
                                                </p>
                                                <p className="truncate text-xs text-muted-foreground">
                                                    {user.data.email}
                                                </p>
                                                <span className="mt-1 inline-block rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-medium uppercase tracking-wide text-primary">
                                                    {user.data.role}
                                                </span>
                                            </div>
                                        </div>
                                    </DropdownMenuLabel>

                                    <DropdownMenuSeparator />

                                    <DropdownMenuItem asChild>
                                        <Link href={dashboardLink} className="cursor-pointer">
                                            <LayoutDashboard className="mr-2 h-4 w-4" />
                                            <span>Dashboard</span>
                                        </Link>
                                    </DropdownMenuItem>

                                    <DropdownMenuSeparator />

                                    <DropdownMenuItem
                                        onSelect={handleLogout}
                                        className="cursor-pointer text-destructive focus:text-destructive"
                                    >
                                        <LogOut className="mr-2 h-4 w-4" />
                                        <span>Log out</span>
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        ) : (
                            <Link
                                href="/login"
                                className="inline-flex h-9 items-center justify-center rounded-lg bg-primary px-4 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
                            >
                                Login
                            </Link>
                        )}

                        <button
                            type="button"
                            className="inline-flex h-9 w-9 items-center justify-center rounded-lg border md:hidden"
                            onClick={() => setMobileOpen((open) => !open)}
                            aria-label="Toggle menu"
                        >
                            {mobileOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
                        </button>
                    </div>
                </div>

                {mobileOpen && (
                    <div className="border-t py-4 md:hidden">
                        <div className="flex flex-col gap-3">
                            {navItems.map((item) => (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    onClick={() => setMobileOpen(false)}
                                    className="rounded-lg px-2 py-2 text-sm font-medium hover:bg-muted"
                                >
                                    {item.label}
                                </Link>
                            ))}
                            {!user?.data && (
                                <Link
                                    href="/register"
                                    onClick={() => setMobileOpen(false)}
                                    className="rounded-lg px-2 py-2 text-sm font-medium hover:bg-muted"
                                >
                                    Create account
                                </Link>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </nav>
    );
}
