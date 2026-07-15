import { prisma } from "@/lib/prisma";

export default async function Home() {
  const bands = await prisma.system_interprets.findMany({
    take: 20,
    orderBy: {
      name: "asc",
    },
  });

  return (
    <main className="max-w-6xl mx-auto p-8">
      <h1 className="text-4xl font-bold mb-8">Metal MU</h1>

      <p className="mb-6 text-gray-600">
        Počet načtených interpretů: <strong>{bands.length}</strong>
      </p>

      <div className="grid gap-4">
        {bands.map((band) => (
          <div
            key={band.id_i}
            className="border rounded-lg p-4 shadow-sm"
          >
            <h2 className="text-2xl font-semibold">
              {band.name}
            </h2>

            <p>
              <strong>Město:</strong> {band.city}
            </p>

            <p>
              <strong>Styly:</strong> {band.styles}
            </p>
          </div>
        ))}
      </div>
    </main>
  );
}