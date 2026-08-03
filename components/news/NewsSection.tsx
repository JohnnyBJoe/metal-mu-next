import Link from "next/link";

import type { NewsItem } from "@/lib/services/news";

type Props = {
  title: string;
  moreHref: string;
  items: NewsItem[];
};

export default function NewsSection({
  title,
  moreHref,
  items,
}: Props) {
  return (
    <section className="mt-8 rounded bg-zinc-900 p-6">

      <div className="mb-6 flex items-center justify-between">

        <h2 className="text-2xl font-bold text-red-500">
          {title}
        </h2>

        <Link
          href={moreHref}
          className="text-sm text-zinc-400 hover:text-red-500"
        >
          More →
        </Link>

      </div>

      <ul className="space-y-3">

        {items.map((item) => (

          <li
            key={item.id}
            className="border-b border-zinc-800 pb-3"
          >

            <Link
              href={
                item.type === "album"
                  ? `/?band=${item.bandId}&album=${item.id}`
                  : `/?band=${item.id}`
              }
              className="text-white hover:text-red-500"
            >
              {item.title}
            </Link>

            {item.subtitle && (
              <div className="text-sm text-zinc-500">
                {item.subtitle}
              </div>
            )}

            <div className="text-xs text-zinc-600">
              {item.date.toLocaleDateString("cs-CZ")}
            </div>

          </li>

        ))}

      </ul>

    </section>
  );
}