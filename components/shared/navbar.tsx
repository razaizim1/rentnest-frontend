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
import { LogOut, Settings, User } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";

// Navigation items configuration
const navItems = [
    { label: "Home", href: "/" },
    { label: "About", href: "/about" },
    { label: "Services", href: "/services" },
    { label: "Contact", href: "/contact" },
];

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
    }
}

type userProps = {
    user: IUser;
}

export function Navbar({ user }: userProps) {
    const router = useRouter();
    const handleUserMenuAction = async (action: string) => {

        if (action === "logout") {
            await logout();
            toast.success("User Logged Out Successfully!");
            router.push("/login");
        }
    };

    return (
        <nav className="border-b border-border">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    {/* Logo */}
                    <Link href="/" className="shrink-0">
                        <span className="text-2xl font-bold text-primary">
                            NextJs Press
                        </span>
                    </Link>

                    {/* Nav Links */}
                    <div className="hidden md:absolute md:left-1/2 md:transform md:-translate-x-1/2 md:flex md:items-center md:gap-8">
                        {navItems.map((item) => (
                            <Link
                                key={item.href}
                                href={item.href}
                                className="text-foreground hover:text-primary transition-colors text-sm font-medium"
                            >
                                {item.label}
                            </Link>
                        ))}
                    </div>

                    {/* User Dropdown */}


                    {user?.data && (
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <div className="cursor-pointer">
                                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                                        <User className="w-4 h-4 text-primary" />
                                    </div>
                                </div>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="w-56">
                                <DropdownMenuLabel className="font-normal">
                                    <div className="flex flex-col gap-1">
                                        <p className="text-sm font-medium">
                                            {user?.data?.name || "User"
                                            }
                                        </p>
                                        <p className="text-xs text-muted-foreground">
                                            {user?.data?.email || "User Email"}
                                        </p>
                                    </div>
                                </DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem>
                                    <Settings className="w-4 h-4 mr-2" />
                                    <span>Settings</span>
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem onSelect={() => handleUserMenuAction("logout")}>
                                    <LogOut className="w-4 h-4 mr-2" />
                                    <span>Log out</span>
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    )}
                    {!user?.data && (
                        <Link href="/login" className="text-foreground hover:text-primary transition-colors text-sm font-medium">
                            Login
                        </Link>
                    )}
                </div>
            </div>
        </nav>
    );
}