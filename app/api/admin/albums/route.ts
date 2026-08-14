import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

const VALID_TYPES = new Set([
  1, 2, 3, 4, 5, 6, 7, 8, 9,
]);

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const interpret = Number(body.interpret);
    const type = Number(body.type);

    const name =
      typeof body.name === "string"
        ? body.name.trim()
        : "";

    const vydano =
      typeof body.vydano === "string"
        ? body.vydano.trim()
        : "";

    const label =
      typeof body.label === "string"
        ? body.label.trim()
        : "";

    const info =
      typeof body.info === "string"
        ? body.info
        : "";

    const obal =
      typeof body.obal === "string"
        ? body.obal.trim()
        : "";

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

    if (!name) {
      return NextResponse.json(
        {
          error: "Album name is required.",
        },
        { status: 400 }
      );
    }

    if (!VALID_TYPES.has(type)) {
      return NextResponse.json(
        {
          error: "Invalid album type.",
        },
        { status: 400 }
      );
    }

    if (vydano.length > 10) {
      return NextResponse.json(
        {
          error:
            "Release information must be 10 characters or less.",
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
          error:
            "Selected band was not found.",
        },
        { status: 400 }
      );
    }

    const now = new Date();

    const album =
      await prisma.system_discography.create({
        data: {
          interpret,
          name,
          type,
          info,
          vydano: vydano || null,
          naposled: now,
          obal,
          label,
          date: now,
        },
      });

    return NextResponse.json({
      success: true,
      album,
    });
  } catch (error) {
    console.error(
      "Failed to create album:",
      error
    );

    return NextResponse.json(
      {
        error: "Failed to create album.",
      },
      { status: 500 }
    );
  }
}