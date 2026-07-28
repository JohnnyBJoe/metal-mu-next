import AlbumMemberList from "@/components/album/AlbumMemberList";

import { getAlbumGuests } from "@/lib/services/albums";

type AlbumGuestsProps = {
  albumId: number;
};

export default async function AlbumGuests({
  albumId,
}: AlbumGuestsProps) {
  const guests = await getAlbumGuests(albumId);

  return (
    <AlbumMemberList
      title="Guests"
      members={guests}
    />
  );
}