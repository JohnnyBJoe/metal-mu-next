"use client";

import { useState } from "react";

type AdStatusButtonProps = {
  adId: number;
  active: boolean;
};

export default function AdStatusButton({
  adId,
  active,
}: AdStatusButtonProps) {
  const [isActive, setIsActive] = useState(active);
  const [saving, setSaving] = useState(false);

  async function handleClick() {
    setSaving(true);

    try {
      const response = await fetch(
        `/api/admin/ads/${adId}/status`,
        {
          method: "PATCH",
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.error ?? "Failed to change status."
        );
      }

      setIsActive(data.active);
    } catch (error) {
      console.error(error);
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="flex items-center gap-3">
      {isActive ? (
        <span className="text-green-500">
          Active
        </span>
      ) : (
        <span className="text-zinc-500">
          Inactive
        </span>
      )}

      <button
        type="button"
        onClick={handleClick}
        disabled={saving}
        className="rounded border border-zinc-700 px-3 py-1 text-xs text-zinc-300 transition hover:border-red-600 hover:text-red-500 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {saving
          ? "Saving..."
          : isActive
            ? "Deactivate"
            : "Activate"}
      </button>
    </div>
  );
}