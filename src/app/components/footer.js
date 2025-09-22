import Link from "next/link";

const footerNav = [
    { label: "About", href: "#mission" },
    { label: "Projects", href: "#projects" },
    { label: "Team", href: "/team" },
    { label: "Get Involved", href: "#get-involved" },
];

export default function Footer() {
    return (
        <footer className="mt-16 border-t border-black/10 dark:border-white/10 bg-white/60 dark:bg-neutral-900/60 backdrop-blur">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid gap-10 md:grid-cols-3">
                    <div className="space-y-3">
                        <h3 className="text-sm font-semibold tracking-wide text-neutral-600 dark:text-neutral-400 uppercase">
                            DFA Yale
                        </h3>
                        <p className="text-sm leading-relaxed text-neutral-600 dark:text-neutral-400 max-w-xs">
                            A student-led human-centered design studio at Yale advancing
                            social impact through interdisciplinary collaboration.
                        </p>
                    </div>
                    <nav className="flex flex-wrap gap-4 text-sm md:justify-center">
                        {footerNav.map((item) => (
                            <Link
                                key={item.href}
                                href={item.href}
                                className="hover:text-black dark:hover:text-white transition-colors"
                            >
                                {item.label}
                            </Link>
                        ))}
                    </nav>
                    <div className="space-y-3 md:text-right">
                        <p className="text-sm text-neutral-500 dark:text-neutral-400">
                            &copy; {new Date().getFullYear()} DFA Yale. All rights reserved.
                        </p>
                        <p className="text-xs text-neutral-400">
                            Built with Next.js & Tailwind CSS.
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    );
}
