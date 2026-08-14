import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

type Context = {
  params: Promise<{
    id: string;
  }>;
};

export async function POST(
  request: Request,
  { params }: Context
) {
  try {
    const { id } = await params;
    const albumId = Number(id);

    if (!Number.isInteger(albumId) || albumId <= 0) {
      return NextResponse.json(
        {
          error: "Invalid album ID.",
        },
        { status: 400 }
      );
    }

    const album =
      await prisma.system_discography.findUnique({
        where: {
          id_d: albumId,
        },
        select: {
          id_d: true,
          interpret: true,
        },
      });

    if (!album) {
      return NextResponse.json(
        {
          error: "Album not found.",
        },
        { status: 404 }
      );
    }

    const body = await request.json();

    const name =
      typeof body.name === "string"
        ? body.name.trim()
        : "";

    const lyric =
      typeof body.lyric === "string"
        ? body.lyric.trim()
        : "";

    if (!name) {
      return NextResponse.json(
        {
          error: "Track name is required.",
        },
        { status: 400 }
      );
    }

    const track =
      await prisma.system_discography_tracks.create({
        data: {
          name,
          album: album.id_d,
          lyric,
          mp3: "",
          interpret: album.interpret,
        },
        select: {
          id_t: true,
          name: true,
          album: true,
          lyric: true,
          interpret: true,
        },
      });

    return NextResponse.json({
      success: true,
      track,
    });
  } catch (error) {
    console.error(
      "Failed to create track:",
      error
    );

    return NextResponse.json(
      {
        error: "Failed to create track.",
      },
      { status: 500 }
    );
  }
}

export async function PATCH(
  request: Request,
  { params }: Context
) {
  try {
    const { id } = await params;
    const albumId = Number(id);

    if (!Number.isInteger(albumId) || albumId <= 0) {
      return NextResponse.json(
        {
          error: "Invalid album ID.",
        },
        { status: 400 }
      );
    }

    const body = await request.json();

    const trackId = Number(body.id_t);

    const name =
      typeof body.name === "string"
        ? body.name.trim()
        : "";

    const lyric =
      typeof body.lyric === "string"
        ? body.lyric.trim()
        : "";

    if (
      !Number.isInteger(trackId) ||
      trackId <= 0
    ) {
      return NextResponse.json(
        {
          error: "Invalid track ID.",
        },
        { status: 400 }
      );
    }

    if (!name) {
      return NextResponse.json(
        {
          error: "Track name is required.",
        },
        { status: 400 }
      );
    }

    const track =
      await prisma.system_discography_tracks.findFirst({
        where: {
          id_t: trackId,
          album: albumId,
        },
        select: {
          id_t: true,
        },
      });

    if (!track) {
      return NextResponse.json(
        {
          error: "Track not found.",
        },
        { status: 404 }
      );
    }

    const updatedTrack =
      await prisma.system_discography_tracks.update({
        where: {
          id_t: track.id_t,
        },
        data: {
          name,
          lyric,
        },
        select: {
          id_t: true,
          name: true,
          album: true,
          lyric: true,
          interpret: true,
        },
      });

    return NextResponse.json({
      success: true,
      track: updatedTrack,
    });
  } catch (error) {
    console.error(
      "Failed to update track:",
      error
    );

    return NextResponse.json(
      {
        error: "Failed to update track.",
      },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: Context
) {
  try {
    const { id } = await params;
    const albumId = Number(id);

    if (!Number.isInteger(albumId) || albumId <= 0) {
      return NextResponse.json(
        {
          error: "Invalid album ID.",
        },
        { status: 400 }
      );
    }

    const body = await request.json();

    const trackId = Number(body.id_t);

    if (
      !Number.isInteger(trackId) ||
      trackId <= 0
    ) {
      return NextResponse.json(
        {
          error: "Invalid track ID.",
        },
        { status: 400 }
      );
    }

    const track =
      await prisma.system_discography_tracks.findFirst({
        where: {
          id_t: trackId,
          album: albumId,
        },
        select: {
          id_t: true,
        },
      });

    if (!track) {
      return NextResponse.json(
        {
          error: "Track not found.",
        },
        { status: 404 }
      );
    }

    await prisma.system_discography_tracks.delete({
      where: {
        id_t: track.id_t,
      },
    });

    return NextResponse.json({
      success: true,
    });
  } catch (error) {
    console.error(
      "Failed to delete track:",
      error
    );

    return NextResponse.json(
      {
        error: "Failed to delete track.",
      },
      { status: 500 }
    );
  }
}