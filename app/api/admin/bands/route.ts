import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const name =
      typeof body.name === "string"
        ? body.name.trim()
        : "";

    const city =
      typeof body.city === "string"
        ? body.city.trim()
        : "";

    const homepage =
      typeof body.homepage === "string"
        ? body.homepage.trim()
        : "";

    const info =
      typeof body.info === "string"
        ? body.info.trim()
        : "";

    const biografie =
      typeof body.biografie === "string"
        ? body.biografie.trim()
        : "";

    const foto =
      typeof body.foto === "string"
        ? body.foto.trim()
        : "";

    const logo =
      typeof body.logo === "string"
        ? body.logo.trim()
        : "";

    const country = Number(body.country);

    const genre1 = Number(body.genre1);
    const genre2 = Number(body.genre2);
    const genre3 = Number(body.genre3);

    const dateStart =
      typeof body.date_start === "string" &&
      body.date_start
        ? new Date(`${body.date_start}T00:00:00`)
        : null;

    const dateEnd =
      typeof body.date_end === "string" &&
      body.date_end
        ? new Date(`${body.date_end}T00:00:00`)
        : null;

    if (!name) {
      return NextResponse.json(
        { error: "Band name is required." },
        { status: 400 }
      );
    }

    if (!Number.isInteger(country) || country <= 0) {
      return NextResponse.json(
        { error: "Country is required." },
        { status: 400 }
      );
    }

    const genreIds = [
      genre1,
      genre2,
      genre3,
    ].filter(
      (id) => Number.isInteger(id) && id > 0
    );

    const uniqueGenreIds = [
      ...new Set(genreIds),
    ];

    const styles =
      uniqueGenreIds.length > 0
        ? uniqueGenreIds.join(",")
        : "0";

    if (
      dateStart &&
      Number.isNaN(dateStart.getTime())
    ) {
      return NextResponse.json(
        { error: "Invalid start date." },
        { status: 400 }
      );
    }

    if (
      dateEnd &&
      Number.isNaN(dateEnd.getTime())
    ) {
      return NextResponse.json(
        { error: "Invalid end date." },
        { status: 400 }
      );
    }

    if (
      dateStart &&
      dateEnd &&
      dateEnd < dateStart
    ) {
      return NextResponse.json(
        {
          error:
            "End date cannot be earlier than start date.",
        },
        { status: 400 }
      );
    }

    const countryExists =
      await prisma.system_countries.findUnique({
        where: {
          id_c: country,
        },
        select: {
          id_c: true,
        },
      });

    if (!countryExists) {
      return NextResponse.json(
        { error: "Selected country does not exist." },
        { status: 400 }
      );
    }

    if (uniqueGenreIds.length > 0) {
      const existingGenres =
        await prisma.system_styles.findMany({
          where: {
            id_s: {
              in: uniqueGenreIds,
            },
          },
          select: {
            id_s: true,
          },
        });

      const existingGenreIds = new Set(
        existingGenres.map(
          (genre) => genre.id_s
        )
      );

      const invalidGenre = uniqueGenreIds.find(
        (id) => !existingGenreIds.has(id)
      );

      if (invalidGenre) {
        return NextResponse.json(
          {
            error: `Selected genre does not exist: ${invalidGenre}.`,
          },
          { status: 400 }
        );
      }
    }
const now = new Date();
    const band =
      await prisma.system_interprets.create({
        data: {
          name,
          styles,
          info,
          foto,
          logo,
          city,
          date_start: dateStart,
          date_end: dateEnd,
          biografie,
          country,
          homepage,
          date: now,
  edit: now,
        },
        select: {
          id_i: true,
          name: true,
          styles: true,
          country: true,
          city: true,
          homepage: true,
          date_start: true,
          date_end: true,
        },
      });

    return NextResponse.json({
      success: true,
      band,
    });
  } catch {
    return NextResponse.json(
      {
        error: "Failed to create band.",
      },
      { status: 500 }
    );
  }
}