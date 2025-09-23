const stats = [
    { num: "25+", label: "Active Members" },
    { num: "10+", label: "Community Partners" },
    { num: "15+", label: "Projects Shipped" },
    { num: "5", label: "Focus Areas" },
];

export default function ImpactStats() {
    return (
        <section className="py-20" aria-labelledby="impact-heading">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="rounded-3xl border border-black/10 dark:border-white/10 bg-white/70 dark:bg-neutral-900/70 backdrop-blur shadow-md">
                    <h2 id="impact-heading" className="sr-only">Impact Metrics</h2>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 md:gap-12 px-6 py-8 sm:px-8 sm:py-10">
                        {stats.map((s) => (
                            <div key={s.label} className="text-center">
                                <div className="text-3xl md:text-4xl font-semibold tracking-tight">
                                    {s.num}
                                </div>
                                <div className="mt-2 text-xs md:text-sm uppercase tracking-wide text-neutral-500 dark:text-neutral-400">
                                    {s.label}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
