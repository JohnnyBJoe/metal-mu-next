import Link from "next/link";

type PaginationProps = {
  currentPage: number;
  totalItems: number;
  pageSize: number;

  baseUrl: string;

  letter?: string;
};

export default function Pagination({
  currentPage,
  totalItems,
  pageSize,
  baseUrl,
  letter,
}: PaginationProps) {

  const totalPages = Math.max(
    1,
    Math.ceil(totalItems / pageSize)
  );

  const previousPage = currentPage - 1;
  const nextPage = currentPage + 1;

  const buildUrl = (page: number) => {

    if (baseUrl === "/") {
      return `/?letter=${letter ?? "A"}&page=${page}`;
    }

    return `${baseUrl}?page=${page}`;
  };

  return (
    <div className="mt-4 border-t border-zinc-700 pt-3">

      <div className="mb-2 text-center text-xs text-zinc-500">
        Page {currentPage} / {totalPages}
      </div>

      <div className="flex items-center justify-between">

        {currentPage > 1 ? (
          <Link
            href={buildUrl(previousPage)}
            className="text-sm text-zinc-400 hover:text-red-500"
          >
            ◀ Previous
          </Link>
        ) : (
          <span />
        )}

        {currentPage < totalPages ? (
          <Link
            href={buildUrl(nextPage)}
            className="text-sm text-zinc-400 hover:text-red-500"
          >
            Next ▶
          </Link>
        ) : (
          <span />
        )}

      </div>

    </div>
  );
}