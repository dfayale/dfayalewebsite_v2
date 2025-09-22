import Link from "next/link";

export default function TeamPreview() {
    return (
        <section id="team" className="py-20 border-t border-b border-black/5 dark:border-white/10" aria-labelledby="team-heading">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
                    <div className="max-w-xl">
                        <h2 id="team-heading" className="text-3xl md:text-4xl font-semibold tracking-tight">
                            A Collaborative, Curious Team
                        </h2>
                        <p className="mt-4 text-neutral-600 dark:text-neutral-300 leading-relaxed">
                            We bring together designers, engineers, researchers, and storytellers. Meet the people behind our projects.
                        </p>
                    </div>
                    <Link
                        href="/team"
                        className="inline-flex items-center justify-center rounded-full border border-black/15 dark:border-white/20 px-6 py-2 text-sm font-medium hover:bg-black/5 dark:hover:bg-white/10 transition-colors self-start"
                    >
                        View Full Team
                    </Link>
                </div>
                <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    {[1, 2, 3, 4].map((i) => (
                        <div
                            key={i}
                            className="aspect-[3/4] rounded-2xl border border-black/10 dark:border-white/10 bg-gradient-to-br from-neutral-100 to-neutral-50 dark:from-neutral-800 dark:to-neutral-900 flex items-end p-4 relative overflow-hidden"
                        >
                            <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(255,255,255,0.6),transparent_60%)] dark:bg-[radial-gradient(circle_at_70%_30%,rgba(255,255,255,0.05),transparent_60%)]" />
                            <div className="relative">
                                <div className="text-sm font-medium">Member Name</div>
                                <div className="text-xs text-neutral-500 dark:text-neutral-400">Role / Track</div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
