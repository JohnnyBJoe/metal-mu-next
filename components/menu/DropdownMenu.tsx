import Link from "next/link";

type DropdownMenuProps = {
  items: string[];
  param?: string;
  basePath?: string;
};

export default function DropdownMenu({
  items,
  param = "letter",
  basePath = "/",
}: DropdownMenuProps) {
  return (
    <div className="absolute left-0 top-full z-50 min-w-56 rounded-md border border-zinc-700 bg-zinc-900 shadow-xl">
      {items.map((item) => (
        <Link
          key={item}
          href={`${basePath}?${param}=${encodeURIComponent(item)}`}
          className="block px-4 py-2 text-sm text-zinc-300 hover:bg-red-700 hover:text-white"
        >
          {item}
        </Link>
      ))}
    </div>
  );
}