import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";

import EditAdvertisementForm from "./EditAdvertisementForm";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

export default async function EditAdvertisementPage({
  params,
}: Props) {
  const { id } = await params;

  const adId = Number(id);

  if (!Number.isInteger(adId)) {
    notFound();
  }

  const ad = await prisma.system_ads.findUnique({
    where: {
      id: adId,
    },
  });

  if (!ad) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-zinc-950 px-6 py-8 text-white">
      <div className="mx-auto max-w-3xl">

        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold text-red-500">
              Edit Advertisement
            </h1>

            <p className="mt-2 text-zinc-400">
              Advertisement #{ad.id}
            </p>
          </div>

          <a
            href="/admin/ads"
            className="text-sm text-zinc-400 hover:text-red-500"
          >
            ← Advertisements
          </a>
        </div>

        <EditAdvertisementForm
          ad={{
            id: ad.id,
            image: ad.image,
            target_url: ad.target_url,
            ordered_impressions:
              ad.ordered_impressions,
            impressions: ad.impressions,
            cpm: ad.cpm.toString(),
            active: ad.active,
          }}
        />

      </div>
    </main>
  );
}