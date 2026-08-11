import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { writeFile, mkdir } from "fs/promises";
import path from "path";
import sharp from "sharp";

export async function POST(request: Request) {
  try {
    const formData = await request.formData();

    const image = formData.get("image");
    const targetUrl = formData.get("targetUrl");
    const orderedImpressions = formData.get(
      "orderedImpressions"
    );
    const cpm = formData.get("cpm");

    if (!(image instanceof File)) {
      return NextResponse.json(
        { error: "Banner image is required." },
        { status: 400 }
      );
    }

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

    if (!Number.isInteger(ordered) || ordered <= 0) {
      return NextResponse.json(
        { error: "Invalid ordered impressions." },
        { status: 400 }
      );
    }

    if (Number.isNaN(price) || price < 0) {
      return NextResponse.json(
        { error: "Invalid CPM." },
        { status: 400 }
      );
    }

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

    const extension =
      path.extname(image.name).toLowerCase() || ".jpg";

    const extensionMap: Record<string, string> = {
      ".jpg": ".jpg",
      ".jpeg": ".jpg",
      ".png": ".png",
      ".webp": ".webp",
    };

    const finalExtension =
      extensionMap[extension];

    if (!finalExtension) {
      return NextResponse.json(
        { error: "Unsupported image format." },
        { status: 400 }
      );
    }

    const fileName = `ad-${Date.now()}${finalExtension}`;

    const adsDirectory = path.join(
      process.cwd(),
      "public",
      "ads"
    );

    await mkdir(adsDirectory, {
      recursive: true,
    });

    const filePath = path.join(
      adsDirectory,
      fileName
    );

    await writeFile(filePath, buffer);

    const ad = await prisma.system_ads.create({
      data: {
        image: fileName,
        target_url: targetUrl.trim(),
        ordered_impressions: ordered,
        impressions: 0,
        cpm: price,
      },
    });

    return NextResponse.json({
      success: true,
      ad,
    });
  } catch {
    return NextResponse.json(
      { error: "Failed to create advertisement." },
      { status: 500 }
    );
  }
}