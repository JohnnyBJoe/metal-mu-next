export function stripLineup(info: string): string {
  const markers = [
    "Produced by",
    "Recorded at",
    "Recorded",
    "Recorded live",
    "Engineered by",
    "Mixed by",
    "Remixed by",
    "Mastered by",
    "Lyrics by",
    "Music by",
    "Compiled by",
    "Artwork",
    "Cover artwork",
    "Cover concept",
    "Photography",
    "Photo",
    "Executive producer",
    "Executive Producer",
    "Date of release",
    "This is a concept album",
    "Concept album",
    "Remastered",
  ];

  let index = -1;

  for (const marker of markers) {
    const i = info.indexOf(marker);

    if (i !== -1 && (index === -1 || i < index)) {
      index = i;
    }
  }

  // Pokud album neobsahuje žádné další informace,
  // nechceme znovu zobrazovat HTML line-up.
  if (index === -1) {
    return "";
  }

  return info.substring(index).trim();
}