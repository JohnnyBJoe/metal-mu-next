import { prisma } from "@/lib/prisma";

export type NewsItemType =
  | "band"
  | "album"
  | "musician";

export type NewsAction =
  | "new"
  | "updated";

export type NewsItem = {
  type: NewsItemType;
  action: NewsAction;
  id: number;
  title: string;
  subtitle?: string;
  date: Date;
};

export async function getLatestBands(
  limit = 10
): Promise<NewsItem[]> {

  const bands = await prisma.system_interprets.findMany({
    orderBy: {
      date: "desc",
    },

    take: limit,

    select: {
      id_i: true,
      name: true,
      country: true,
      date: true,
    },
  });

  const countries = await prisma.system_countries.findMany({
    select: {
      id_c: true,
      text: true,
    },
  });

  const countryMap = new Map<number, string>();

  countries.forEach((country) => {
    countryMap.set(country.id_c, country.text);
  });

  return bands.map((band) => ({
    type: "band",
    action: "new",

    id: band.id_i,

    title: band.name,

    subtitle: countryMap.get(band.country) ?? "",

    date: band.date,
  }));
}
export async function getUpdatedBands(
  limit = 10
): Promise<NewsItem[]> {

  const bands = await prisma.system_interprets.findMany({
    orderBy: {
      edit: "desc",
    },

    take: limit,

    select: {
      id_i: true,
      name: true,
      country: true,
      edit: true,
    },
  });

  const countries = await prisma.system_countries.findMany({
    select: {
      id_c: true,
      text: true,
    },
  });

  const countryMap = new Map<number, string>();

  countries.forEach((country) => {
    countryMap.set(country.id_c, country.text);
  });

  return bands.map((band) => ({
    type: "band",
    action: "updated",

    id: band.id_i,

    title: band.name,

    subtitle: countryMap.get(band.country) ?? "",

    date: band.edit,
  }));
}