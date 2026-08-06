import Link from "next/link";

import type { NewsItem } from "@/lib/services/news";
import SectionBadge from "@/components/news/SectionBadge";

type Props = {
  type: "new" | "updated";
  title: string;
  moreHref: string;
  items: NewsItem[];
};

export default function NewsSection({
  type,
  title,
  moreHref,
  items,
}: Props){
  return (
    <section className="rounded bg-zinc-900 p-4">

      <div className="mb-3 flex items-center justify-between border-b border-zinc-800 pb-2">

        <div className="flex items-center gap-2">

  <SectionBadge type={type} />

  <h2 className="text-lg font-bold text-red-500">
    {title}
  </h2>

</div>

        <Link
          href={moreHref}
          className="text-xs text-zinc-400 transition hover:text-red-500"
        >
          Browse →
        </Link>

      </div>

      <ul className="space-y-1">

        {items.map((item) => (

          <li
            key={item.id}
            className="border-b border-zinc-800 py-1 last:border-0"
          >

            <Link
              href={
                item.type === "musician"
                  ? `/persons?person=${item.id}`
                  : item.type === "album"
                    ? `/bands?band=${item.bandId}&album=${item.id}`
                    : `/?band=${item.id}`
              }
              className="block text-sm text-white transition hover:text-red-500"
            >
              {item.title}
            </Link>

            {item.subtitle && (
              <div className="text-xs text-zinc-500">
                {item.subtitle}
              </div>
            )}

            <div className="text-[11px] text-zinc-600">
              {item.date.toLocaleDateString("cs-CZ")}
            </div>

          </li>

        ))}

      </ul>

    </section>
  );
}