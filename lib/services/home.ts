import { prisma } from "@/lib/prisma";

import {
  getBands,
  getBand,
  getBandLetter,
  getBandPage,
} from "@/lib/services/bands";

import {
  getDiscography,
  getAlbum,
} from "@/lib/services/albums";

import { getMembers } from "@/lib/services/members";

import {
  getTracks,
  getTrack,
} from "@/lib/services/tracks";

type HomeParams = {
  letter?: string;
  band?: string;
  album?: string;
  track?: string;
  page?: string;
};

export async function getHomeData({
  letter,
  band,
  album,
  track,
  page,
}: HomeParams) {
  let currentLetter = letter;

  const bandId =
    band && !Number.isNaN(Number(band))
      ? Number(band)
      : null;

  if (!currentLetter && bandId !== null) {
    currentLetter = await getBandLetter(bandId);
  }

  currentLetter ??= "A";

  let currentPage =
    page && !Number.isNaN(Number(page))
      ? Number(page)
      : 1;

  // Pokud stránka není zadána, dopočítej ji podle pozice kapely.
  if (!page && bandId !== null) {
    currentPage = await getBandPage(bandId);
  }

  const bandData = await getBands(
    currentLetter,
    currentPage
  );

  const selectedBand = bandId
    ? await getBand(bandId)
    : null;

  const members = bandId
    ? await getMembers(bandId)
    : {
        current: [],
        previous: [],
      };

  const styles = await prisma.system_styles.findMany({
    orderBy: {
      id_s: "asc",
    },
  });

  const countries = await prisma.system_countries.findMany({
    orderBy: {
      text: "asc",
    },
  });

  const discography = bandId
    ? await getDiscography(bandId)
    : [];

  const selectedAlbum = album
    ? await getAlbum(Number(album))
    : null;

  const albumTracks = album
    ? await getTracks(Number(album))
    : [];

  const selectedTrack = track
    ? await getTrack(Number(track))
    : null;

  return {
    currentLetter,
    currentPage,

    bands: bandData.items,
    totalBands: bandData.total,

    selectedBand,
    members,

    styles,
    countries,

    discography,

    selectedAlbum,
    albumTracks,
    selectedTrack,
  };
}
export async function getStatistics() {

  const [
    bands,
    releases,
    musicians,
  ] = await Promise.all([

    prisma.system_interprets.count(),

    prisma.system_discography.count(),

    prisma.system_interprets_members.count(),

  ]);

  return {
    bands,
    releases,
    musicians,
  };
}