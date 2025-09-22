import Link from "next/link";

export default function GetInvolved() {
    return (
        <section id="get-involved" className="py-28 relative" aria-labelledby="get-involved-heading">
            <div className="absolute inset-0 -z-10 bg-[linear-gradient(120deg,rgba(99,102,241,0.12),rgba(236,72,153,0.12))]" />
            <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 text-center">
                <h2 id="get-involved-heading" className="text-3xl md:text-4xl font-semibold tracking-tight">
                    Ready to Design for Impact?
                </h2>
                <p className="mt-6 text-neutral-600 dark:text-neutral-300 leading-relaxed max-w-2xl mx-auto">
                    Whether you&apos;re new to design or have experience, there&apos;s a place for you in DFA. Apply to join a project team, collaborate with partners, and grow your skills.
                </p>
                <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
                    <Link
                        href="/apply"
                        className="inline-flex items-center justify-center rounded-full bg-black text-white dark:bg-white dark:text-black px-8 py-3 text-sm font-medium shadow hover:shadow-md transition-shadow"
                    >
                        Apply Now
                    </Link>
                    <Link
                        href="#newsletter"
                        className="inline-flex items-center justify-center rounded-full border border-black/15 dark:border-white/20 px-8 py-3 text-sm font-medium hover:bg-black/5 dark:hover:bg-white/10 transition-colors"
                    >
                        Get Updates
                    </Link>
                </div>
            </div>
        </section>
    );
}
