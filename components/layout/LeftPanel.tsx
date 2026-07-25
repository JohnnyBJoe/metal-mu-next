import Link from "next/link";
type Band = {
  id_i: number;
  name: string;
  city: string;
  styles: string;
};

type LeftPanelProps = {
  letter: string;
  bands: Band[];
};

export default function LeftPanel({
  letter,
  bands,
}: LeftPanelProps) {
  return (
    <aside className="rounded bg-zinc-900 p-4 h-[calc(100vh-110px)] overflow-y-auto">
      <h2 className="mb-4 text-lg font-semibold text-red-500">
        Bands
      </h2>

      <ul className="space-y-2">
        {bands.map((band) => (
          <li
            key={band.id_i}
            className="rounded border border-zinc-800 p-2 hover:bg-zinc-800 cursor-pointer"
          >
                        <Link
  href={`/?letter=${letter}&band=${band.id_i}`}
  className="font-semibold text-white hover:text-red-500"
>
  {band.name}
</Link>

            
          </li>
        ))}
      </ul>
    </aside>
  );
}