import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

type Context = {
  params: Promise<{
    id: string;
  }>;
};

export async function PATCH(
  request: Request,
  { params }: Context
) {
  try {
    const { id } = await params;

    const bandId = Number(id);

    if (!Number.isInteger(bandId)) {
      return NextResponse.json(
        {
          error: "Invalid band ID.",
        },
        {
          status: 400,
        }
      );
    }

    const band =
      await prisma.system_interprets.findUnique({
        where: {
          id_i: bandId,
        },
        select: {
          id_i: true,
        },
      });

    if (!band) {
      return NextResponse.json(
        {
          error: "Band not found.",
        },
        {
          status: 404,
        }
      );
    }

    const body = await request.json();

    const name = body.name;
    const country = Number(body.country);
    const city = body.city;

    const genre1 = Number(body.genre1);
    const genre2 = Number(body.genre2);
    const genre3 = Number(body.genre3);

    const homepage = body.homepage;
    const info = body.info;
    const biografie = body.biografie;

    const foto = body.foto;
    const logo = body.logo;

    const dateStart = body.date_start;
    const dateEnd = body.date_end;

    if (
      typeof name !== "string" ||
      !name.trim()
    ) {
      return NextResponse.json(
        {
          error: "Band name is required.",
        },
        {
          status: 400,
        }
      );
    }

    if (
      !Number.isInteger(country) ||
      country < 0
    ) {
      return NextResponse.json(
        {
          error: "Invalid country.",
        },
        {
          status: 400,
        }
      );
    }

    if (
      typeof city !== "string"
    ) {
      return NextResponse.json(
        {
          error: "Invalid city.",
        },
        {
          status: 400,
        }
      );
    }

    const genres = [
      genre1,
      genre2,
      genre3,
    ].filter(
      (genre) =>
        Number.isInteger(genre) &&
        genre > 0
    );

    const styles = genres.join(",");

    if (
      typeof homepage !== "string" ||
      typeof info !== "string" ||
      typeof biografie !== "string" ||
      typeof foto !== "string" ||
      typeof logo !== "string"
    ) {
      return NextResponse.json(
        {
          error: "Invalid band information.",
        },
        {
          status: 400,
        }
      );
    }

    function parseDate(
      value: unknown
    ): Date | null | "invalid" {
      if (
        value === null ||
        value === undefined ||
        value === ""
      ) {
        return null;
      }

      if (
        typeof value !== "string" ||
        !/^\d{4}-\d{2}-\d{2}$/.test(value)
      ) {
        return "invalid";
      }

      const date = new Date(
        `${value}T00:00:00`
      );

      if (
        Number.isNaN(date.getTime())
      ) {
        return "invalid";
      }

      return date;
    }

    const parsedDateStart =
      parseDate(dateStart);

    const parsedDateEnd =
      parseDate(dateEnd);

    if (
      parsedDateStart === "invalid" ||
      parsedDateEnd === "invalid"
    ) {
      return NextResponse.json(
        {
          error: "Invalid date format.",
        },
        {
          status: 400,
        }
      );
    }

    if (
      parsedDateStart &&
      parsedDateEnd &&
      parsedDateEnd < parsedDateStart
    ) {
      return NextResponse.json(
        {
          error:
            "End date cannot be earlier than start date.",
        },
        {
          status: 400,
        }
      );
    }

    const updatedBand =
      await prisma.system_interprets.update({
        where: {
          id_i: band.id_i,
        },
        data: {
          name: name.trim(),
          country,
          city: city.trim(),
          styles,
          homepage: homepage.trim(),
          info,
          biografie,
          foto: foto.trim(),
          logo: logo.trim(),
          date_start: parsedDateStart,
          date_end: parsedDateEnd,
        },
        select: {
          id_i: true,
          name: true,
        },
      });

    return NextResponse.json({
      success: true,
      band: updatedBand,
    });
    } catch (error) {
    console.error(
      "Failed to update band:",
      error
    );

    return NextResponse.json(
      {
        error: "Failed to update band.",
      },
      {
        status: 500,
      }
    );
  }
}