import Header from "@/components/layout/Header";

export default function StudiosPage() {
  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      <Header />

      <main className="mx-auto max-w-7xl px-6 py-8">
        <section className="rounded bg-zinc-900 p-6">

          <h1 className="mb-6 text-4xl font-bold text-red-500">
            Studios
          </h1>

        </section>
      </main>
    </div>
  );
}