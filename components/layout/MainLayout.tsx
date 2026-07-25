import type { ReactNode } from "react";

import Header from "@/components/layout/Header";
import LeftPanel from "@/components/layout/LeftPanel";
import RightPanel from "@/components/layout/RightPanel";

type Band = {
  id_i: number;
  name: string;
  city: string;
  styles: string;
};

type Album = {
  id_d: number;
  name: string;
  vydano: string | null;
  type: number;
};

type MainLayoutProps = {
  children: ReactNode;

  bands: Band[];

  albums: Album[];

  letter: string;

  bandId: number | null;
  albumId: number | null;
};

export default function MainLayout({
  children,
  bands,
  albums,
  letter,
  bandId,
  albumId,
}: MainLayoutProps) {
  return (
    <div className="min-h-screen bg-zinc-950 text-white">

      <Header />

      <div className="grid grid-cols-12 gap-4 p-4">

        <div className="col-span-2">
          <LeftPanel bands={bands} />
        </div>

        <div className="col-span-8">
          {children}
        </div>

        <div className="col-span-2">
          <RightPanel
            letter={letter}
            bandId={bandId}
            albumId={albumId}
            albums={albums}
          />
        </div>

      </div>

    </div>
  );
}