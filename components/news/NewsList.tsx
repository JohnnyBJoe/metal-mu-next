import Link from "next/link";

import type { NewsItem } from "@/lib/services/news";

type NewsListProps = {
  title: string;
  items: NewsItem[];
};

export default function NewsList({
  title,
  items,
}: NewsListProps) {
  return (
    <section className="rounded bg-zinc-900 p-6">

      <h2 className="mb-6 text-2xl font-bold text-red-500">
        {title}
      </h2>

      <ul className="divide-y divide-zinc-800">

  {items.map((item) => (

    <li
      key={item.id}
      className="flex items-center justify-between py-2"
    >

      <Link
        href={
          item.type === "musician"
            ? `/persons?person=${item.id}`
            : item.type === "album"
              ? `/bands?band=${item.bandId}&album=${item.id}`
              : `/bands?band=${item.id}`
        }
        className="truncate text-white transition hover:text-red-500"
      >
        {item.title}

        {item.subtitle && item.subtitle !== "????" && (
          <span className="text-zinc-500">
            {" - "}
            {item.subtitle}
          </span>
        )}

      </Link>

      <span className="ml-4 shrink-0 text-xs text-zinc-600">
        {item.date.toLocaleDateString("cs-CZ")}
      </span>

    </li>

  ))}

</ul>

    </section>
  );
}