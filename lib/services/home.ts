import { prisma } from "@/lib/prisma";

import { getBands, getBand } from "@/lib/services/bands";
import { getDiscography, getAlbum } from "@/lib/services/albums";
import { getMembers } from "@/lib/services/members";
import { getTracks, getTrack } from "@/lib/services/tracks";

type HomeParams = {
  letter: string;
  band?: string;
  album?: string;
  track?: string;
};

export async function getHomeData({
  letter,
  band,
  album,
  track,
}: HomeParams) {
  const bands = await getBands(letter);

  const selectedBand = band
    ? await getBand(Number(band))
    : null;

  const members = band
    ? await getMembers(Number(band))
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

  const discography = band
    ? await getDiscography(Number(band))
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
    bands,
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