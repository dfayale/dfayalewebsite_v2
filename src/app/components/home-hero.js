import Link from "next/link";

export default function HomeHero() {
    return (
        <section className="relative overflow-hidden pb-24 -mt-14 sm:-mt-16" aria-labelledby="hero-heading">
            <div className="absolute inset-0 -z-10">
                <div className="absolute inset-0 bg-gradient-to-br from-stone-100 via-indigo-200/90 to-indigo-400/10" />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-stone-50/40 to-white/90" />
                <div className="absolute inset-0 backdrop-blur-[2px]" />
                <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white/95 via-white/60 to-transparent backdrop-blur-sm" />
            </div>
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-24">
                <div className="max-w-3xl">
                    <h1
                        id="hero-heading"
                        className="mt-25 text-4xl sm:text-5xl md:text-6xl font-semibold tracking-tight leading-[1.1]"
                    >
                        Human-Centered Design for Social Impact at Yale
                    </h1>
                    <p className="mt-6 text-lg md:text-xl text-neutral-600 dark:text-neutral-300 max-w-2xl leading-relaxed">
                        We&apos;re a student-led design studio tackling real-world challenges
                        with community partners. We learn by doing—researching, prototyping,
                        and building solutions that matter.
                    </p>
                    <div className="mt-10 flex flex-col sm:flex-row gap-4">
                        <Link
                            href="#get-involved"
                            className="inline-flex items-center justify-center rounded-full bg-black text-white dark:bg-white dark:text-black px-8 py-3 text-sm font-medium shadow hover:shadow-md transition-shadow"
                        >
                            Join a Project
                        </Link>
                        <Link
                            href="#projects"
                            className="inline-flex items-center justify-center rounded-full border border-black/15 dark:border-white/20 px-8 py-3 text-sm font-medium hover:bg-black/5 dark:hover:bg-white/10 transition-colors"
                        >
                            View Our Work
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
}
