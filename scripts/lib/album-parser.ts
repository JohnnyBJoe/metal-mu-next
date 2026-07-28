export type AlbumSection = "Line-up" | "Guest";

export interface AlbumCredit {
  section: AlbumSection;
  creditedAs: string;
  role: string;
}

type Block = {
  credits: AlbumCredit[];
};

export function parseAlbumInfo(
  html: string
): AlbumCredit[] {

  if (!html) {
    return [];
  }

  // sjednocení HTML
  html = html
    .replace(/\r/g, "")
    .replace(/<br\s*\/?>/gi, "\n")
    .replace(/&nbsp;/gi, " ")
    .trim();

  const lines = html
    .split("\n")
    .map((line) => line.trim());

  const blocks: Block[] = [];

  let current: AlbumCredit[] = [];

  for (const line of lines) {

    if (
      /^Produced by/i.test(line) ||
      /^Recorded at/i.test(line) ||
      /^Engineered by/i.test(line) ||
      /^Mixed by/i.test(line) ||
      /^Mastered by/i.test(line)
    ) {
      break;
    }

    if (line === "") {

      if (current.length > 0) {

        blocks.push({
          credits: current,
        });

        current = [];
      }

      continue;
    }

    const match = line.match(
      /<b>(.*?)<\/b>\s*-\s*(.*)/i
    );

    if (!match) {
      continue;
    }

    current.push({
      section: "Line-up",
      creditedAs: match[1].trim(),
      role: match[2].trim(),
    });
  }

  if (current.length > 0) {
    blocks.push({
      credits: current,
    });
  }

  // pouze jeden blok
  if (blocks.length <= 1) {
    return blocks.flatMap((b) => b.credits);
  }

  // najdeme první blok,
  // který obsahuje alespoň 2 muzikanty
  // za prvním blokem

  let guestBlock = -1;

  for (let i = 1; i < blocks.length; i++) {

    if (blocks[i].credits.length >= 2) {

      guestBlock = i;
      break;
    }
  }

  if (guestBlock === -1) {
    return blocks.flatMap((b) => b.credits);
  }

  const result: AlbumCredit[] = [];

  blocks.forEach((block, index) => {

    block.credits.forEach((credit) => {

      result.push({
        ...credit,
        section:
          index >= guestBlock
            ? "Guest"
            : "Line-up",
      });

    });

  });

  return result;
}