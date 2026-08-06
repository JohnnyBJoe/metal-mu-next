import Image from "next/image";
import Link from "next/link";

type Release = {
  id_d: number;
  interpret: number;
  name: string;
  obal: string | null;
  band: string;
};

type Props = {
  items: Release[];
};

export default function LatestReleases({
  items,
}: Props) {
  return (
    <section className="rounded-xl border border-zinc-800 bg-zinc-900 p-6">

      <div className="mb-6 flex items-center justify-between">

        <h2 className="text-xl font-bold text-red-500">
          Latest Releases
        </h2>

        <Link
          href="/news/new-releases"
          className="text-sm text-zinc-400 transition hover:text-red-500"
        >
          Browse all →
        </Link>

      </div>

     <div className="grid grid-cols-2 gap-6 md:grid-cols-3 xl:grid-cols-6">

        {items.map((album) => (

          <Link
            key={album.id_d}
            href={`/bands?band=${album.interpret}&album=${album.id_d}`}
            className="group"
          >

            <div className="overflow-hidden rounded border border-zinc-800">

              <Image
                src={
    album.obal
      ? `/cover/${album.obal}`
      : "/no-cover.jpg"
  }
                
                alt={album.name}
                width={300}
                height={300}
                className="aspect-square w-full object-cover transition duration-300 group-hover:scale-105"
              />

            </div>

            <div className="mt-3 text-sm font-semibold text-white transition group-hover:text-red-500">

              {album.name}

            </div>
<div className="mt-1 text-sm text-zinc-500">
  {album.band}
</div>
          </Link>

        ))}

      </div>

    </section>
  );
}