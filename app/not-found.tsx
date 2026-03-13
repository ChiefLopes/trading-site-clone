import Link from "next/link";

import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-zinc-950 via-zinc-950 to-black text-white">
      <div className="pointer-events-none absolute -left-24 top-16 h-64 w-64 rounded-full bg-emerald-500/20 blur-[120px]" />
      <div className="pointer-events-none absolute -right-32 bottom-12 h-72 w-72 rounded-full bg-sky-500/20 blur-[140px]" />

      <div className="relative mx-auto flex min-h-screen max-w-5xl flex-col justify-center px-6 py-16">
        <p className="text-xs uppercase tracking-[0.35em] text-zinc-400">
          Infinity Digital Trade
        </p>
        <div className="mt-6 flex flex-col gap-6">
          <div className="inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs text-zinc-300">
            <span className="rounded-full bg-emerald-400/20 px-2 py-0.5 text-[10px] uppercase tracking-[0.2em] text-emerald-200">
              Signal Lost
            </span>
            The route you requested is offline.
          </div>

          <div>
            <h1 className="text-5xl font-semibold leading-tight sm:text-6xl">
              404
              <span className="block bg-gradient-to-r from-emerald-200 via-white to-sky-200 bg-clip-text text-transparent">
                Page not found.
              </span>
            </h1>
            <p className="mt-4 max-w-2xl text-base text-zinc-300 sm:text-lg">
              The page may have moved, been retired, or never existed. Use the
              shortcuts below to get back on track.
            </p>
          </div>

          <div className="flex flex-wrap gap-4">
            <Button asChild size="lg">
              <Link href="/">Back to home</Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link href="/dashboard">Open dashboard</Link>
            </Button>
          </div>

          <div className="mt-4 grid gap-4 rounded-2xl border border-white/10 bg-white/5 p-6 text-sm text-zinc-300 sm:grid-cols-3">
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-zinc-500">
                What now
              </p>
              <p className="mt-2">Check the URL, or navigate using the menu.</p>
            </div>
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-zinc-500">
                Need access
              </p>
              <p className="mt-2">
                Sign in to see protected dashboards and tools.
              </p>
            </div>
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-zinc-500">
                Support
              </p>
              <p className="mt-2">Reach out to the team if you are stuck.</p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
