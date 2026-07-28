type CatalogUrlParams = {
  letter?: string;
  page?: number;
  band?: number | null;
  album?: number | null;
  track?: number | null;
};

export function buildCatalogUrl({
  letter = "A",
  page = 1,
  band,
  album,
  track,
}: CatalogUrlParams) {
  const params = new URLSearchParams();

  params.set("letter", letter);
  params.set("page", String(page));

  if (band !== undefined && band !== null) {
    params.set("band", String(band));
  }

  if (album !== undefined && album !== null) {
    params.set("album", String(album));
  }

  if (track !== undefined && track !== null) {
    params.set("track", String(track));
  }

  return `/?${params.toString()}`;
}