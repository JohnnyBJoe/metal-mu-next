import Header from "@/components/layout/Header";
import LeftPanel from "@/components/layout/LeftPanel";
import CenterPanel from "@/components/layout/CenterPanel";
import RightPanel from "@/components/layout/RightPanel";

import { prisma } from "@/lib/prisma";
import { getBands, getBand } from "@/lib/services/bands";
import { getDiscography } from "@/lib/services/albums";
import { getMembers } from "@/lib/services/members";

type HomeProps = {
  searchParams: Promise<{
    letter?: string;
    band?: string;
    album?: string;
  }>;
};

export default async function Home({ searchParams }: HomeProps) {
  const { letter = "A", band } = await searchParams;

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

  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      <Header />

      <div className="grid grid-cols-12 gap-4 p-4">

        <div className="col-span-2">
          <LeftPanel bands={bands} />
        </div>

        <div className="col-span-8">
          <CenterPanel
            band={selectedBand}
            styles={styles}
            countries={countries}
            members={members}
          />
        </div>

        <div className="col-span-2">
          <RightPanel albums={discography} />
        </div>

      </div>
    </div>
  );
}