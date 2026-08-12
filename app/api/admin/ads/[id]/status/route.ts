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

    const adId = Number(id);

    if (!Number.isInteger(adId)) {
      return NextResponse.json(
        { error: "Invalid advertisement ID." },
        { status: 400 }
      );
    }

    const ad = await prisma.system_ads.findUnique({
      where: {
        id: adId,
      },
      select: {
        id: true,
        active: true,
      },
    });

    if (!ad) {
      return NextResponse.json(
        { error: "Advertisement not found." },
        { status: 404 }
      );
    }

    const updatedAd = await prisma.system_ads.update({
      where: {
        id: ad.id,
      },
      data: {
        active: !ad.active,
      },
      select: {
        id: true,
        active: true,
      },
    });

    return NextResponse.json({
      success: true,
      active: updatedAd.active,
    });
  } catch {
    return NextResponse.json(
      {
        error: "Failed to change advertisement status.",
      },
      { status: 500 }
    );
  }
}