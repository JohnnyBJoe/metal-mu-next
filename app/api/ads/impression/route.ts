import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const adId = Number(body.adId);

    if (!adId || Number.isNaN(adId)) {
      return NextResponse.json(
        { error: "Invalid ad ID" },
        { status: 400 }
      );
    }

    const ad = await prisma.system_ads.findUnique({
      where: {
        id: adId,
      },
      select: {
        id: true,
        impressions: true,
        ordered_impressions: true,
      },
    });

    if (!ad) {
      return NextResponse.json(
        { error: "Ad not found" },
        { status: 404 }
      );
    }

    if (ad.impressions >= ad.ordered_impressions) {
      return NextResponse.json({
        success: false,
        reason: "Impression limit reached",
      });
    }

    await prisma.system_ads.update({
      where: {
        id: ad.id,
      },
      data: {
        impressions: {
          increment: 1,
        },
      },
    });

    return NextResponse.json({
      success: true,
    });
  } catch {
    return NextResponse.json(
      { error: "Invalid request" },
      { status: 400 }
    );
  }
}