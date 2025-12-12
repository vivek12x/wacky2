"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Store, Receipt, BarChart3, BookOpen, MoreHorizontal } from "lucide-react";

export function Navbar() {
    const pathname = usePathname();

    const navItems = [
        { name: "Inventory", href: "/inventory", icon: Store },
        { name: "Billing", href: "/billing", icon: Receipt },
        { name: "Analytics", href: "/analytics", icon: BarChart3 },
        { name: "Credit Ledger", href: "/ledger", icon: BookOpen },
        { name: "More", href: "/more", icon: MoreHorizontal },
    ];

    return (
        <nav className="border-b bg-background sticky top-0 z-50">
            <div className="container mx-auto flex h-16 items-center px-4">
                <div className="mr-8 font-bold text-xl tracking-tight text-primary">
                    KiranaFlow
                </div>
                <div className="flex space-x-6">
                    {navItems.map((item) => {
                        const isActive = pathname.startsWith(item.href);
                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={cn(
                                    "group flex items-center space-x-2 text-sm font-medium transition-colors hover:text-primary",
                                    isActive
                                        ? "text-primary border-b-2 border-primary pb-[1.3rem] mt-[1.3rem]"
                                        : "text-muted-foreground pb-[1.4rem] mt-[1.4rem] border-transparent border-b-2 hover:border-muted-foreground/20"
                                )}
                            >
                                <item.icon className={cn("h-4 w-4", isActive ? "text-primary" : "text-muted-foreground group-hover:text-primary")} />
                                <span>{item.name}</span>
                            </Link>
                        );
                    })}
                </div>
            </div>
        </nav>
    );
}
