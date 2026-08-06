import Link from "next/link";

type Props = {
  active?: string;
};

const items = [
  {
  id: "all",
  title: "All News&Updates",
  href: "/news",
},
{
    id: "new-bands",
    title: "New Bands",
    href: "/news/new-bands",
  },
  {
    id: "updated-bands",
    title: "Updated Bands",
    href: "/news/updated-bands",
  },
  {
    id: "new-releases",
    title: "New Releases",
    href: "/news/new-releases",
  },
  {
    id: "updated-releases",
    title: "Updated Releases",
    href: "/news/updated-releases",
  },
  {
    id: "new-musicians",
    title: "New Musicians",
    href: "/news/new-musicians",
  },
  {
    id: "updated-musicians",
    title: "Updated Musicians",
    href: "/news/updated-musicians",
  },
];

export default function NewsMenu({
  active,
}: Props) {
  return (
    <nav className="mb-6">

      <h2 className="mb-4 text-3xl font-bold text-red-500">
        News &amp; Updates
      </h2>

      <div className="flex flex-wrap gap-2">

        {items.map((item) => (

          <Link
            key={item.id}
            href={item.href}
            className={
              item.id === active
                ? "rounded bg-red-700 px-4 py-2 text-sm font-medium text-white"
                : "rounded bg-zinc-900 px-4 py-2 text-sm text-zinc-300 transition hover:bg-zinc-800 hover:text-white"
            }
          >
            {item.title}
          </Link>

        ))}

      </div>

    </nav>
  );
}