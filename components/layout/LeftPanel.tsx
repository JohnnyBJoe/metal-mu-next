import Link from "next/link";

import Pagination from "@/components/layout/Pagination";
import { PAGE_SIZE } from "@/lib/constants";
import { buildCatalogUrl } from "@/lib/utils/catalogUrl";
type Band = {
  id_i: number;
  name: string;
  city: string;
  styles: string;
};

type LeftPanelProps = {
  letter?: string;
  bands: Band[];
  baseUrl?: string;

  subtitle?: string;
  countLabel?: string;

  selectedId?: number;

  currentPage?: number;
  totalItems?: number;
};

export default function LeftPanel({
  letter,
  bands,
  baseUrl = "/",

  subtitle,
  countLabel,

  selectedId,

  currentPage = 1,
  totalItems = bands.length,
}: LeftPanelProps) {
  return (
    <aside className="flex h-[calc(100vh-110px)] flex-col rounded bg-zinc-900 p-4">

      {subtitle ? (
        <>
          <h2 className="mb-2 text-2xl font-bold text-red-500">
            {subtitle}
          </h2>

          <div className="mb-3 border-b border-zinc-700 pb-2 text-sm text-zinc-400">
            {countLabel ?? `${totalItems} bands`}
          </div>
        </>
      ) : (
        <>
          <h2 className="mb-2 text-2xl font-bold text-red-500">
            Bands
          </h2>

          <div className="mb-3 border-b border-zinc-700 pb-2 text-sm text-zinc-400">
            {countLabel ?? `${totalItems} bands`}
          </div>
        </>
      )}

      <div className="flex-1 overflow-y-auto">
        <ul className="space-y-0.5">
          {bands.map((band) => {
            const href =
  baseUrl === "/"
    ? buildCatalogUrl({
        letter,
        page: currentPage,
        band: band.id_i,
      })
    : `${baseUrl}?page=${currentPage}&band=${band.id_i}`;

            const active = band.id_i === selectedId;

            return (
              <li
                key={band.id_i}
                className={
                  active
                    ? "rounded border-l-4 border-red-600 bg-red-950/30 px-2 py-0.5"
                    : "rounded border border-zinc-800 px-2 py-0.5 hover:bg-zinc-800"
                }
              >
                <Link
                  href={href}
                  className={
                    active
                      ? "block text-sm leading-4 text-white"
                      : "block text-sm leading-4 text-white hover:text-red-500"
                  }
                >
                  {band.name}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>

      <Pagination
        currentPage={currentPage}
        totalItems={totalItems}
        pageSize={PAGE_SIZE}
        baseUrl={baseUrl}
        letter={letter}
      />

    </aside>
  );
}