import { prisma } from "@/lib/prisma";

export async function getAvailableAds() {
  const ads = await prisma.system_ads.findMany({
    orderBy: {
      id: "asc",
    },
  });

  return ads.filter(
    (ad) => ad.impressions < ad.ordered_impressions
  );
}