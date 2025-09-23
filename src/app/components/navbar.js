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
        <header className="sticky top-4 z-50 transition-all">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div
                    className={`h-14 sm:h-16 flex items-center justify-between rounded-full border backdrop-blur px-3 sm:px-5 shadow-sm transition-all
                    ${scrolled
                            ? "bg-white/70 dark:bg-neutral-900/70 border-black/10 dark:border-white/10 shadow-md"
                            : "bg-white/50 dark:bg-neutral-900/50 border-black/5 dark:border-white/5"
                        }`}
                >
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
                            className="md:hidden inline-flex items-center justify-center w-10 h-10 rounded-full border border-black/10 dark:border-white/10 bg-white/60 dark:bg-neutral-900/60 backdrop-blur"
                            onClick={() => setOpen((o) => !o)}
                        >
                            <span className="sr-only">Menu</span>
                            <div className="space-y-1.5">
                                <span
                                    className={`block h-0.5 w-5 bg-current transition-transform ${open ? "translate-y-2 rotate-45" : ""}`}
                                />
                                <span
                                    className={`block h-0.5 w-5 bg-current transition-opacity ${open ? "opacity-0" : ""}`}
                                />
                                <span
                                    className={`block h-0.5 w-5 bg-current transition-transform ${open ? "-translate-y-2 -rotate-45" : ""}`}
                                />
                            </div>
                        </button>
                    </div>
                </div>
            </div>
            {open && (
                <div className="md:hidden px-4 sm:px-6 lg:px-8">
                    <div className="mx-auto max-w-7xl mt-2 rounded-2xl border border-black/10 dark:border-white/10 bg-white/80 dark:bg-neutral-900/80 backdrop-blur shadow-lg">
                        <nav className="p-4 flex flex-col gap-4 text-sm">
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
                </div>
            )}
        </header>
    );
}
