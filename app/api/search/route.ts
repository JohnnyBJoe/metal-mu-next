import { NextResponse } from "next/server";

import { searchAll } from "@/lib/services/search";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  const q = searchParams.get("q")?.trim() ?? "";

  if (q.length < 2) {
    return NextResponse.json({
      bands: [],
      persons: [],
      albums: [],
    });
  }

  const results = await searchAll(q);

  return NextResponse.json(results);
}