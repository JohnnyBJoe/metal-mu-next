import AlbumMemberList from "@/components/album/AlbumMemberList";

import { getAlbumLineup } from "@/lib/services/albums";

type AlbumLineupProps = {
  albumId: number;
};

export default async function AlbumLineup({
  albumId,
}: AlbumLineupProps) {
  const lineup = await getAlbumLineup(albumId);

  return (
    <AlbumMemberList
      title="Full line-up"
      members={lineup}
    />
  );
}