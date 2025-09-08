import Link from "next/link";

export default function Home() {
  return (
    <main className="mx-auto max-w-5xl px-6 py-20">
      <div className="text-center space-y-6">
        <h1 className="text-4xl md:text-6xl font-semibold text-[#306f98]">
          Which Linkit.Digital solution fits your goals?
        </h1>
        <p className="text-lg md:text-xl text-neutral-700">
          Take a quick quiz and get a tailored recommendation.
        </p>
        <Link
          href="/quiz"
          className="inline-flex items-center rounded-full bg-[#306f98] px-8 py-4 text-white text-lg font-semibold shadow-md hover:bg-[#285e80] focus:outline-none focus:ring-4 focus:ring-[#306f98]/30 transition"
        >
          Start free assessment
        </Link>
        <div className="mt-8 flex items-center justify-center gap-6 text-sm opacity-80 text-[#306f98]">
          <span>Certified team</span>
          <span>Agile implementations</span>
          <span>Results-driven</span>
        </div>
      </div>
    </main>
  );
}
