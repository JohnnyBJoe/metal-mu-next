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
        impressions: true,
      },
    });

    if (!ad) {
      return NextResponse.json(
        { error: "Advertisement not found." },
        { status: 404 }
      );
    }

    const body = await request.json();

    const targetUrl = body.targetUrl;
    const orderedImpressions = Number(
      body.orderedImpressions
    );
    const cpm = Number(body.cpm);

    if (
      typeof targetUrl !== "string" ||
      !targetUrl.trim()
    ) {
      return NextResponse.json(
        { error: "Target URL is required." },
        { status: 400 }
      );
    }

    if (
      !Number.isInteger(orderedImpressions) ||
      orderedImpressions < ad.impressions
    ) {
      return NextResponse.json(
        {
          error: `Ordered impressions cannot be lower than delivered impressions (${ad.impressions}).`,
        },
        { status: 400 }
      );
    }

    if (Number.isNaN(cpm) || cpm < 0) {
      return NextResponse.json(
        { error: "Invalid CPM." },
        { status: 400 }
      );
    }

    const updatedAd = await prisma.system_ads.update({
      where: {
        id: ad.id,
      },
      data: {
        target_url: targetUrl.trim(),
        ordered_impressions: orderedImpressions,
        cpm,
      },
      select: {
        id: true,
        target_url: true,
        ordered_impressions: true,
        impressions: true,
        cpm: true,
      },
    });

    return NextResponse.json({
      success: true,
      ad: updatedAd,
    });
  } catch {
    return NextResponse.json(
      {
        error: "Failed to update advertisement.",
      },
      { status: 500 }
    );
  }
}