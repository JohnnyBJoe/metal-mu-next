import Header from "@/components/layout/Header";

export default function DonatePage() {
  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      <Header />

      <main className="mx-auto max-w-4xl px-6 py-8">
        <section className="rounded bg-zinc-900 p-6">

          <h1 className="mb-6 text-4xl font-bold text-red-500">
            Donate
          </h1>

          <p className="mb-6 text-zinc-300">
            If you enjoy Rock&amp;Metal Book and would like to support
            its development, you can make a donation.
          </p>

          <div className="rounded border border-zinc-800 bg-zinc-950 p-6">
            <p className="text-zinc-400">
              Donation options will be available here.
            </p>
          </div>

        </section>
      </main>
    </div>
  );
}