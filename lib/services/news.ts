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
  bandId?: number;
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
export async function getLatestAlbums(
  limit = 10
): Promise<NewsItem[]> {

  const albums = await prisma.system_discography.findMany({
    orderBy: {
      date: "desc",
    },

    take: limit,

    select: {
      id_d: true,
      interpret: true,
      name: true,
      date: true,
    },
  });

  const bands = await prisma.system_interprets.findMany({
    select: {
      id_i: true,
      name: true,
    },
  });

  const bandMap = new Map<number, string>();

  bands.forEach((band) => {
    bandMap.set(band.id_i, band.name);
  });

  return albums.map((album) => ({
    type: "album",
    action: "new",

    id: album.id_d,
    bandId: album.interpret,
    
    title: album.name,

    subtitle: bandMap.get(album.interpret) ?? "",

    date: album.date,
  }));
}
export async function getUpdatedAlbums(
  limit = 10
): Promise<NewsItem[]> {

  const albums = await prisma.system_discography.findMany({
    orderBy: {
      naposled: "desc",
    },

    take: limit,

    select: {
      id_d: true,
      interpret: true,
      name: true,
      naposled: true,
    },
  });

  const bands = await prisma.system_interprets.findMany({
    select: {
      id_i: true,
      name: true,
    },
  });

  const bandMap = new Map<number, string>();

  bands.forEach((band) => {
    bandMap.set(band.id_i, band.name);
  });

  return albums.map((album) => ({
    type: "album",
    action: "updated",

    id: album.id_d,
    bandId: album.interpret,

    title: album.name,

    subtitle: bandMap.get(album.interpret) ?? "",

    date: album.naposled,
  }));
}
export async function getLatestMembers(
  limit = 10
): Promise<NewsItem[]> {

  const members = await prisma.system_interprets_members.findMany({
    orderBy: {
      date: "desc",
    },

    take: limit,

    select: {
      id_m: true,
      name: true,
      interpret: true,
      date: true,
    },
  });

  const bands = await prisma.system_interprets.findMany({
    select: {
      id_i: true,
      name: true,
    },
  });

  const bandMap = new Map<number, string>();

  bands.forEach((band) => {
    bandMap.set(band.id_i, band.name);
  });

  return members.map((member) => ({
    type: "musician",
    action: "new",

    id: member.id_m,

    title: member.name,

    subtitle: bandMap.get(member.interpret) ?? "",

    date: member.date,
  }));
}
export async function getUpdatedMembers(
  limit = 10
): Promise<NewsItem[]> {

  const members = await prisma.system_interprets_members.findMany({
    orderBy: {
      edit: "desc",
    },

    take: limit,

    select: {
      id_m: true,
      name: true,
      interpret: true,
      edit: true,
    },
  });

  const bands = await prisma.system_interprets.findMany({
    select: {
      id_i: true,
      name: true,
    },
  });

  const bandMap = new Map<number, string>();

  bands.forEach((band) => {
    bandMap.set(band.id_i, band.name);
  });

  return members.map((member) => ({
    type: "musician",
    action: "updated",

    id: member.id_m,

    title: member.name,

    subtitle: bandMap.get(member.interpret) ?? "",

    date: member.edit,
  }));
}