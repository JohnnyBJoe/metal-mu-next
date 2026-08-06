import Link from "next/link";

import type { NewsItem } from "@/lib/services/news";

type Props = {
  items: NewsItem[];
};

export default function LatestNews({
  items,
}: Props) {
  return (
    <section className="rounded-xl border border-zinc-800 bg-zinc-900 p-6">

      <div className="mb-4 flex items-center justify-between">

        <h2 className="text-xl font-bold text-red-500">
          Latest News&Updates
        </h2>

        <Link
          href="/news"
          className="text-sm text-zinc-400 transition hover:text-red-500"
        >
          Browse all →
        </Link>

      </div>

      <ul className="divide-y divide-zinc-800">

        {items.map((item) => (

          <li
            key={`${item.type}-${item.id}`}
            className="flex items-center justify-between py-2"
          >

            <div className="flex items-center gap-3">

              <span
                className={
                  item.action === "new"
                    ? "h-2.5 w-2.5 rounded-full bg-red-500"
                    : "h-2.5 w-2.5 rounded-full bg-zinc-500"
                }
              />

              <Link
                href={
                  item.type === "musician"
                    ? `/persons?person=${item.id}`
                    : item.type === "album"
                      ? `/bands?band=${item.bandId}&album=${item.id}`
                      : `/?band=${item.id}`
                }
                className="text-sm text-white transition hover:text-red-500"
              >
                {item.title}

                {item.subtitle && (
                  <span className="text-zinc-500">
                    {" "}
                    ({item.subtitle})
                  </span>
                )}

              </Link>

            </div>

            <span className="text-xs text-zinc-500">
              {item.date.toLocaleDateString("cs-CZ")}
            </span>

          </li>

        ))}

      </ul>

    </section>
  );
}