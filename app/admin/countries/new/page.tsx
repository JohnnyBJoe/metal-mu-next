import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";

export default function NewCountryPage() {
  async function createCountry(formData: FormData) {
    "use server";

    const text =
      typeof formData.get("text") === "string"
        ? String(formData.get("text")).trim()
        : "";

    if (!text) {
      return;
    }

    await prisma.system_countries.create({
      data: {
        text,
      },
    });

    redirect("/admin/countries");
  }

  return (
    <main className="min-h-screen bg-zinc-950 px-6 py-8 text-white">
      <div className="mx-auto max-w-3xl">

        <div className="mb-8 flex items-center justify-between">

          <div>
            <h1 className="text-4xl font-bold text-red-500">
              Add Country
            </h1>

            <p className="mt-2 text-zinc-400">
              Add a new country.
            </p>
          </div>

          <a
            href="/admin/countries"
            className="text-sm text-zinc-400 hover:text-red-500"
          >
            ← Countries
          </a>

        </div>

        <form
          action={createCountry}
          className="rounded border border-zinc-800 bg-zinc-900 p-6"
        >

          <label className="mb-2 block text-sm font-semibold text-zinc-300">
            Country name
          </label>

          <input
            type="text"
            name="text"
            required
            maxLength={100}
            placeholder="e.g. Czech Republic"
            className="w-full rounded border border-zinc-700 bg-zinc-950 px-3 py-2 text-sm text-white placeholder:text-zinc-600 focus:border-red-600 focus:outline-none"
          />

          <div className="mt-6 flex items-center gap-4 border-t border-zinc-800 pt-6">

            <button
              type="submit"
              className="rounded bg-red-600 px-5 py-2 text-sm font-semibold text-white hover:bg-red-500"
            >
              Add Country
            </button>

            <a
              href="/admin/countries"
              className="text-sm text-zinc-400 hover:text-white"
            >
              Cancel
            </a>

          </div>

        </form>

      </div>
    </main>
  );
}