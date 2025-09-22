const values = [
    {
        title: "Empathy First",
        desc: "We center the people we design for through deep research and listening.",
    },
    {
        title: "Interdisciplinary Collaboration",
        desc: "Students from diverse backgrounds partner to build holistic solutions.",
    },
    {
        title: "Real Community Impact",
        desc: "We work with local partners to solve meaningful social challenges.",
    },
];

export default function ValueProps() {
    return (
        <section id="mission" className="py-20 border-t border-b border-black/5 dark:border-white/10 bg-white/50 dark:bg-neutral-950/40" aria-labelledby="values-heading">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="max-w-2xl">
                    <h2 id="values-heading" className="text-3xl md:text-4xl font-semibold tracking-tight">
                        Designing with and for People
                    </h2>
                    <p className="mt-4 text-neutral-600 dark:text-neutral-300 leading-relaxed">
                        DFA Yale is a learning community where students practice human-centered design to create tangible impact.
                    </p>
                </div>
                <div className="mt-12 grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
                    {values.map((v) => (
                        <div key={v.title} className="group relative">
                            <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-violet-500/10 to-fuchsia-500/10 opacity-0 group-hover:opacity-100 blur-xl transition-opacity" />
                            <div className="relative rounded-2xl border border-black/10 dark:border-white/10 bg-white/70 dark:bg-neutral-900/70 backdrop-blur p-6 flex flex-col gap-3">
                                <h3 className="font-medium tracking-tight text-lg">{v.title}</h3>
                                <p className="text-sm leading-relaxed text-neutral-600 dark:text-neutral-400">{v.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
