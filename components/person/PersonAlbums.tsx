type PersonAlbumsProps = {
  personName?: string;
};

export default function PersonAlbums({
  personName,
}: PersonAlbumsProps) {
  return (
    <aside className="rounded bg-zinc-900 p-4 h-[calc(100vh-110px)] overflow-y-auto">
      <h2 className="mb-4 text-lg font-semibold text-red-500">
        Albums
      </h2>

      {personName ? (
        <p className="text-zinc-300">
          Albums by <strong>{personName}</strong> will appear here.
        </p>
      ) : (
        <p className="text-zinc-500">
          Select a musician.
        </p>
      )}
    </aside>
  );
}