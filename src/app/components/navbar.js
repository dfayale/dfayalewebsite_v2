"use client";
import Link from "next/link";
import { useState, useEffect } from "react";

const navItems = [
    { href: "/", label: "Home" },
    { href: "/team", label: "Team" },
    { href: "#projects", label: "Projects" },
    { href: "#get-involved", label: "Get Involved" },
];

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const [open, setOpen] = useState(false);

    useEffect(() => {
        const handler = () => setScrolled(window.scrollY > 10);
        window.addEventListener("scroll", handler);
        return () => window.removeEventListener("scroll", handler);
    }, []);

    return (
        <header
            className={`sticky top-0 z-50 transition-all backdrop-blur supports-[backdrop-filter]:bg-white/70 dark:supports-[backdrop-filter]:bg-neutral-900/70 ${scrolled
                    ? "border-b border-black/10 dark:border-white/10 shadow-sm"
                    : ""
                }`}
        >
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
                <Link
                    href="/"
                    className="text-lg font-semibold tracking-tight hover:opacity-80 transition-opacity"
                >
                    DFA Yale
                </Link>
                <nav className="hidden md:flex gap-8 text-sm font-medium">
                    {navItems.map((item) => (
                        <Link
                            key={item.href}
                            href={item.href}
                            className="relative group tracking-tight"
                        >
                            {item.label}
                            <span className="absolute -bottom-1 left-0 w-0 h-px bg-current transition-all group-hover:w-full" />
                        </Link>
                    ))}
                </nav>
                <div className="flex items-center gap-3">
                    <Link
                        href="#get-involved"
                        className="hidden sm:inline-flex rounded-full bg-black text-white dark:bg-white dark:text-black px-4 py-2 text-sm font-medium shadow-sm hover:shadow transition-shadow"
                    >
                        Join Us
                    </Link>
                    <button
                        aria-label="Toggle navigation"
                        className="md:hidden inline-flex items-center justify-center w-10 h-10 rounded-md border border-black/10 dark:border-white/10"
                        onClick={() => setOpen((o) => !o)}
                    >
                        <span className="sr-only">Menu</span>
                        <div className="space-y-1.5">
                            <span
                                className={`block h-0.5 w-5 bg-current transition-transform ${open ? "translate-y-2 rotate-45" : ""
                                    }`}
                            />
                            <span
                                className={`block h-0.5 w-5 bg-current transition-opacity ${open ? "opacity-0" : ""
                                    }`}
                            />
                            <span
                                className={`block h-0.5 w-5 bg-current transition-transform ${open ? "-translate-y-2 -rotate-45" : ""
                                    }`}
                            />
                        </div>
                    </button>
                </div>
            </div>
            {open && (
                <div className="md:hidden border-t border-black/10 dark:border-white/10 bg-white/90 dark:bg-neutral-900/90 backdrop-blur">
                    <nav className="px-4 py-4 flex flex-col gap-4 text-sm">
                        {navItems.map((item) => (
                            <Link
                                key={item.href}
                                href={item.href}
                                onClick={() => setOpen(false)}
                                className="py-1"
                            >
                                {item.label}
                            </Link>
                        ))}
                        <Link
                            href="#get-involved"
                            onClick={() => setOpen(false)}
                            className="rounded-md bg-black text-white dark:bg-white dark:text-black px-4 py-2 text-center font-medium"
                        >
                            Join Us
                        </Link>
                    </nav>
                </div>
            )}
        </header>
    );
}
