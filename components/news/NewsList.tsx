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

      <ul className="space-y-3">

        {items.map((item) => (

          <li
            key={item.id}
            className="border-b border-zinc-800 pb-3"
          >

            <Link
              href={`/?band=${item.id}`}
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