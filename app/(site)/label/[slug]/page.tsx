import LabelDetail from "@/components/label/LabelDetail";

import { getAlbumsByLabel } from "@/lib/services/labels";

type LabelPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function LabelPage({
  params,
}: LabelPageProps) {

  const { slug } = await params;

  const label = decodeURIComponent(slug);

  const albums = await getAlbumsByLabel(label);

  return (
    <LabelDetail
      label={label}
      albums={albums}
    />
  );
}