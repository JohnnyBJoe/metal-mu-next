import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { writeFile, unlink } from "fs/promises";
import path from "path";
import sharp from "sharp";

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
        image: true,
        impressions: true,
      },
    });

    if (!ad) {
      return NextResponse.json(
        { error: "Advertisement not found." },
        { status: 404 }
      );
    }

    const formData = await request.formData();

    const targetUrl = formData.get("targetUrl");
    const orderedImpressions =
      formData.get("orderedImpressions");
    const cpm = formData.get("cpm");
    const image = formData.get("image");

    if (
      typeof targetUrl !== "string" ||
      !targetUrl.trim()
    ) {
      return NextResponse.json(
        { error: "Target URL is required." },
        { status: 400 }
      );
    }

    const ordered = Number(orderedImpressions);
    const price = Number(cpm);

    if (
      !Number.isInteger(ordered) ||
      ordered < ad.impressions
    ) {
      return NextResponse.json(
        {
          error: `Ordered impressions cannot be lower than delivered impressions (${ad.impressions}).`,
        },
        { status: 400 }
      );
    }

    if (Number.isNaN(price) || price < 0) {
      return NextResponse.json(
        { error: "Invalid CPM." },
        { status: 400 }
      );
    }

    let newFileName: string | null = null;

    if (image instanceof File) {
      const allowedTypes = [
        "image/jpeg",
        "image/png",
        "image/webp",
      ];

      if (!allowedTypes.includes(image.type)) {
        return NextResponse.json(
          { error: "Unsupported image format." },
          { status: 400 }
        );
      }

      const bytes = await image.arrayBuffer();
      const buffer = Buffer.from(bytes);

      const metadata = await sharp(buffer).metadata();

      if (
        metadata.width !== 468 ||
        metadata.height !== 60
      ) {
        return NextResponse.json(
          {
            error: `Invalid banner size: ${metadata.width ?? 0} × ${metadata.height ?? 0} px. Required size is 468 × 60 px.`,
          },
          { status: 400 }
        );
      }

      const extensionMap: Record<string, string> = {
        "image/jpeg": ".jpg",
        "image/png": ".png",
        "image/webp": ".webp",
      };

      const extension = extensionMap[image.type];

      if (!extension) {
        return NextResponse.json(
          { error: "Unsupported image format." },
          { status: 400 }
        );
      }

      newFileName = `ad-${Date.now()}${extension}`;

      const adsDirectory = path.join(
        process.cwd(),
        "public",
        "ads"
      );

      const newFilePath = path.join(
        adsDirectory,
        newFileName
      );

      await writeFile(newFilePath, buffer);
    }

    const updatedAd = await prisma.system_ads.update({
      where: {
        id: ad.id,
      },
      data: {
        ...(newFileName
          ? { image: newFileName }
          : {}),
        target_url: targetUrl.trim(),
        ordered_impressions: ordered,
        cpm: price,
      },
      select: {
        id: true,
        image: true,
        target_url: true,
        ordered_impressions: true,
        impressions: true,
        cpm: true,
      },
    });

    if (newFileName && ad.image !== newFileName) {
      const oldFilePath = path.join(
        process.cwd(),
        "public",
        "ads",
        ad.image
      );

      try {
        await unlink(oldFilePath);
      } catch {
        // Old banner may already be missing.
      }
    }

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