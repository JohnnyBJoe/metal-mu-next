import { prisma } from "@/lib/prisma";
import { PAGE_SIZE } from "@/lib/constants";

function getBandGroup(name: string): string {
  const first = name.charAt(0).toUpperCase();

  if (/^\d$/.test(first)) {
    return "0-9";
  }

  if (/^[A-Z]$/.test(first)) {
    return first;
  }

  return "#";
}

function getBandWhere(letter: string) {
  if (letter === "0-9") {
    return {
      OR: Array.from({ length: 10 }, (_, i) => ({
        name: {
          startsWith: String(i),
        },
      })),
    };
  }

  if (letter === "#") {
    const alphanumericStarts = [
      ...Array.from({ length: 10 }, (_, i) =>
        String(i)
      ),
      ..."ABCDEFGHIJKLMNOPQRSTUVWXYZ".split(""),
    ];

    return {
      AND: [
        {
          name: {
            not: "",
          },
        },
        {
          NOT: {
            OR: alphanumericStarts.map((char) => ({
              name: {
                startsWith: char,
              },
            })),
          },
        },
      ],
    };
  }

  return {
    name: {
      startsWith: letter,
    },
  };
}

export async function getBands(
  letter: string,
  page: number = 1
) {
  const where = getBandWhere(letter);

  const [items, total] = await Promise.all([
    prisma.system_interprets.findMany({
      where,
      orderBy: {
        name: "asc",
      },
      skip: (page - 1) * PAGE_SIZE,
      take: PAGE_SIZE,
      select: {
        id_i: true,
        name: true,
        city: true,
        styles: true,
      },
    }),

    prisma.system_interprets.count({
      where,
    }),
  ]);

  return {
    items,
    total,
  };
}

export async function getBand(id: number) {
  return prisma.system_interprets.findUnique({
    where: {
      id_i: id,
    },
    select: {
      id_i: true,
      name: true,

      city: true,
      country: true,

      styles: true,

      homepage: true,

      biografie: true,

      foto: true,
      logo: true,

      date_start: true,
      date_end: true,
    },
  });
}

export async function getBandLetter(
  bandId: number
): Promise<string> {
  const band = await prisma.system_interprets.findUnique({
    where: {
      id_i: bandId,
    },
    select: {
      name: true,
    },
  });

  if (!band) {
    return "A";
  }

  return getBandGroup(band.name);
}

/**
 * Vrátí číslo stránky, na které se kapela nachází
 * v abecedním seznamu.
 */
export async function getBandPage(
  bandId: number
): Promise<number> {
  const band = await prisma.system_interprets.findUnique({
    where: {
      id_i: bandId,
    },
    select: {
      name: true,
    },
  });

  if (!band) {
    return 1;
  }

  const letter = getBandGroup(band.name);

  const bands = await prisma.system_interprets.findMany({
    where: getBandWhere(letter),
    orderBy: {
      name: "asc",
    },
    select: {
      id_i: true,
    },
  });

  const index = bands.findIndex(
    (b) => b.id_i === bandId
  );

  if (index < 0) {
    return 1;
  }

  return Math.floor(index / PAGE_SIZE) + 1;
}

export async function getBandOfTheDay() {
  const band = await prisma.system_interprets.findFirst({
    orderBy: {
      date: "desc",
    },

    select: {
      id_i: true,
      name: true,

      country: true,
      styles: true,

      date_start: true,

      biografie: true,

      logo: true,
      foto: true,
    },
  });

  if (!band) {
    return null;
  }

  const country = await prisma.system_countries.findUnique({
    where: {
      id_c: band.country ?? 0,
    },
    select: {
      text: true,
    },
  });

  let styles = "";

  if (band.styles) {
    const ids = band.styles
      .split(",")
      .map((id) => Number(id.trim()))
      .filter((id) => !Number.isNaN(id));

    const styleItems =
      await prisma.system_styles.findMany({
        where: {
          id_s: {
            in: ids,
          },
        },
        orderBy: {
          id_s: "asc",
        },
        select: {
          text: true,
        },
      });

    styles = styleItems
      .slice(0, 3)
      .map((style) => style.text)
      .join(" • ");
  }

  return {
    id_i: band.id_i,

    name: band.name,

    country: country?.text ?? "",

    styles,

    date_start: band.date_start,

    biografie: band.biografie,

    logo: band.logo,
    foto: band.foto,
  };
}