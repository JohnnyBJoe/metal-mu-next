export function stripLineup(
  info: string
): string {

  const markers = [
    "Produced by",
    "Recorded at",
    "Engineered by",
    "Mixed by",
    "Mastered by",
    "Lyrics by",
    "Music by",
    "Cover concept",
    "Artwork",
    "Cover artwork",
    "Photography",
    "Photo",
    "Executive producer",
    "Executive Producer",
  ];

  let index = -1;

  for (const marker of markers) {
    const i = info.indexOf(marker);

    if (i !== -1 && (index === -1 || i < index)) {
      index = i;
    }
  }

  if (index === -1) {
    return info;
  }

  return info.substring(index);
}