import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

function yearToDate(
  value: unknown
): Date | null {
  if (
    typeof value !== "string" ||
    !value.trim()
  ) {
    return null;
  }

  const year = Number(value);

  if (
    !Number.isInteger(year) ||
    year < 1 ||
    year > 9999
  ) {
    return null;
  }

  return new Date(
    `${year.toString().padStart(4, "0")}-01-01T00:00:00.000Z`
  );
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const name = body.name;
    const realName = body.realName;
    const instrument = body.instrument;
    const interpret = Number(body.interpret);
    const birthYear = body.birthYear;
    const placeOfBirth = body.placeOfBirth;
    const deathYear = body.deathYear;
    const pusobeni = body.pusobeni;
    const status = body.status;
    const text = body.text;

    if (
      typeof name !== "string" ||
      !name.trim()
    ) {
      return NextResponse.json(
        {
          error: "Name is required.",
        },
        { status: 400 }
      );
    }

    if (
      typeof instrument !== "string" ||
      !instrument.trim()
    ) {
      return NextResponse.json(
        {
          error: "Instrument is required.",
        },
        { status: 400 }
      );
    }

    if (
      !Number.isInteger(interpret) ||
      interpret <= 0
    ) {
      return NextResponse.json(
        {
          error: "Band is required.",
        },
        { status: 400 }
      );
    }

    if (
      status !== "0" &&
      status !== "1"
    ) {
      return NextResponse.json(
        {
          error: "Invalid musician status.",
        },
        { status: 400 }
      );
    }

    const dateOfBirth =
      yearToDate(birthYear);

    const dateOfDead =
      yearToDate(deathYear);

    if (
      birthYear &&
      !dateOfBirth
    ) {
      return NextResponse.json(
        {
          error: "Invalid year of birth.",
        },
        { status: 400 }
      );
    }

    if (
      deathYear &&
      !dateOfDead
    ) {
      return NextResponse.json(
        {
          error: "Invalid year of death.",
        },
        { status: 400 }
      );
    }

    const band =
      await prisma.system_interprets.findUnique({
        where: {
          id_i: interpret,
        },
        select: {
          id_i: true,
        },
      });

    if (!band) {
      return NextResponse.json(
        {
          error: "Selected band was not found.",
        },
        { status: 400 }
      );
    }

    const musician =
      await prisma.system_interprets_members.create({
        data: {
          name: name.trim(),

          real_name:
            typeof realName === "string"
              ? realName.trim()
              : "",

          instrument:
            instrument.trim(),

          date_of_birth:
            dateOfBirth,

          text:
            typeof text === "string"
              ? text
              : "",

          interpret,

          place_of_birth:
            typeof placeOfBirth === "string" &&
            placeOfBirth.trim()
              ? placeOfBirth.trim()
              : null,

          pusobeni:
            typeof pusobeni === "string" &&
            pusobeni.trim()
              ? pusobeni.trim()
              : null,

          date_of_dead:
            dateOfDead,

          stav:
            Buffer.from(status),

        },
      });

    return NextResponse.json({
      success: true,
      musician,
    });

  } catch (error) {
    console.error(
      "Failed to create musician:",
      error
    );

    return NextResponse.json(
      {
        error:
          "Failed to create musician.",
      },
      { status: 500 }
    );
  }
}