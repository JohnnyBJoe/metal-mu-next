"use client";

import Link from "next/link";
import { useEffect } from "react";

type Ad = {
  id: number;
  image: string;
  target_url: string;
};

type AdBannerSlotProps = {
  ad: Ad;
};

export default function AdBannerSlot({
  ad,
}: AdBannerSlotProps) {
  useEffect(() => {
    fetch("/api/ads/impression", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        adId: ad.id,
      }),
    }).catch(() => {
      // Chyba počítání impresí nesmí ovlivnit zobrazení reklamy.
    });
  }, [ad.id]);

  return (
    <div className="flex justify-center bg-zinc-950 px-6 py-3">
      <Link
        href={ad.target_url}
        target="_blank"
        rel="noopener noreferrer"
        className="block h-[60px] w-[468px] overflow-hidden"
      >
        <img
          src={`/ads/${ad.image}`}
          alt="Advertisement"
          width={468}
          height={60}
          className="h-[60px] w-[468px] object-cover"
        />
      </Link>
    </div>
  );
}