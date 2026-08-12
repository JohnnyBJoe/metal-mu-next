"use client";

import { useState } from "react";

type EditAdvertisementFormProps = {
  ad: {
    id: number;
    image: string;
    target_url: string;
    ordered_impressions: number;
    impressions: number;
    cpm: string;
    active: boolean;
  };
};

export default function EditAdvertisementForm({
  ad,
}: EditAdvertisementFormProps) {
  const [targetUrl, setTargetUrl] = useState(ad.target_url);

  const [orderedImpressions, setOrderedImpressions] =
    useState(String(ad.ordered_impressions));

  const [cpm, setCpm] = useState(ad.cpm);

  const [newImage, setNewImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState("");
  const [imageError, setImageError] = useState("");

  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  function handleImageChange(
    event: React.ChangeEvent<HTMLInputElement>
  ) {
    const file = event.target.files?.[0] ?? null;

    setNewImage(file);
    setImagePreview("");
    setImageError("");
    setError("");

    if (!file) {
      return;
    }

    const imageUrl = URL.createObjectURL(file);

    setImagePreview(imageUrl);

    const previewImage = new Image();

    previewImage.onload = () => {
      if (
        previewImage.width !== 468 ||
        previewImage.height !== 60
      ) {
        setImageError(
          `Invalid banner size: ${previewImage.width} × ${previewImage.height} px. Required size is 468 × 60 px.`
        );
      }
    };

    previewImage.onerror = () => {
      setImageError(
        "The selected file is not a valid image."
      );
    };

    previewImage.src = imageUrl;
  }

  async function handleSubmit(
    event: React.FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    setError("");
    setSaving(true);

    if (imageError) {
      setError(imageError);
      setSaving(false);
      return;
    }

    try {
      const formData = new FormData();

      formData.append("targetUrl", targetUrl);
      formData.append(
        "orderedImpressions",
        orderedImpressions
      );
      formData.append("cpm", cpm);

      if (newImage) {
        formData.append("image", newImage);
      }

      const response = await fetch(
        `/api/admin/ads/${ad.id}`,
        {
          method: "PATCH",
          body: formData,
        }
      );

      const data = await response.json();

      if (!response.ok) {
        setError(
          data.error ??
            "Failed to update advertisement."
        );

        setSaving(false);
        return;
      }

      window.location.href = "/admin/ads";
    } catch {
      setError(
        "An unexpected error occurred."
      );

      setSaving(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6 rounded border border-zinc-800 bg-zinc-900 p-6"
    >

      <div>
        <p className="mb-2 text-sm font-semibold text-zinc-300">
          Current banner
        </p>

        <img
          src={`/ads/${ad.image}`}
          alt="Advertisement"
          width={468}
          height={60}
          className="h-[60px] w-[468px] object-cover"
        />

        <p className="mt-2 text-xs text-zinc-500">
          {ad.image}
        </p>
      </div>

      <div>
        <label className="mb-2 block text-sm font-semibold text-zinc-300">
          Change banner
        </label>

        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="block w-full rounded border border-zinc-700 bg-zinc-950 px-3 py-2 text-sm text-zinc-300 file:mr-4 file:rounded file:border-0 file:bg-red-600 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-white hover:file:bg-red-500"
        />

        <p className="mt-2 text-xs text-zinc-500">
          Leave empty to keep the current banner.
          Required size: 468 × 60 px.
        </p>

        {newImage && (
          <p className="mt-2 text-sm text-zinc-400">
            Selected: {newImage.name}
          </p>
        )}

        {imagePreview && !imageError && (
          <div className="mt-4">
            <p className="mb-2 text-xs text-zinc-500">
              New banner preview:
            </p>

            <div className="overflow-hidden rounded border border-zinc-700 bg-black">
              <img
                src={imagePreview}
                alt="New banner preview"
                width={468}
                height={60}
                className="block h-[60px] w-[468px]"
              />
            </div>
          </div>
        )}

        {imageError && (
          <div className="mt-4 rounded border border-red-900 bg-red-950/30 p-3 text-sm text-red-400">
            {imageError}
          </div>
        )}
      </div>

      <div>
        <label className="mb-2 block text-sm font-semibold text-zinc-300">
          Target URL
        </label>

        <input
          type="url"
          value={targetUrl}
          onChange={(event) =>
            setTargetUrl(event.target.value)
          }
          required
          className="w-full rounded border border-zinc-700 bg-zinc-950 px-3 py-2 text-sm text-white focus:border-red-600 focus:outline-none"
        />
      </div>

      <div>
        <label className="mb-2 block text-sm font-semibold text-zinc-300">
          Ordered impressions
        </label>

        <input
          type="number"
          min={ad.impressions}
          value={orderedImpressions}
          onChange={(event) =>
            setOrderedImpressions(
              event.target.value
            )
          }
          required
          className="w-full rounded border border-zinc-700 bg-zinc-950 px-3 py-2 text-sm text-white focus:border-red-600 focus:outline-none"
        />

        <p className="mt-2 text-xs text-zinc-500">
          Delivered impressions: {ad.impressions}
        </p>
      </div>

      <div>
        <label className="mb-2 block text-sm font-semibold text-zinc-300">
          CPM
        </label>

        <input
          type="number"
          min="0"
          step="0.01"
          value={cpm}
          onChange={(event) =>
            setCpm(event.target.value)
          }
          required
          className="w-full rounded border border-zinc-700 bg-zinc-950 px-3 py-2 text-sm text-white focus:border-red-600 focus:outline-none"
        />
      </div>

      <div>
        <p className="text-sm text-zinc-500">
          Status
        </p>

        <p
          className={
            ad.active
              ? "mt-1 text-green-500"
              : "mt-1 text-zinc-500"
          }
        >
          {ad.active
            ? "Active"
            : "Inactive"}
        </p>
      </div>

      {error && (
        <div className="rounded border border-red-900 bg-red-950/30 p-3 text-sm text-red-400">
          {error}
        </div>
      )}

      <div className="flex items-center gap-4 border-t border-zinc-800 pt-6">

        <button
          type="submit"
          disabled={saving || !!imageError}
          className="rounded bg-red-600 px-5 py-2 text-sm font-semibold text-white hover:bg-red-500 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {saving
            ? "Saving..."
            : "Save Changes"}
        </button>

        <a
          href="/admin/ads"
          className="text-sm text-zinc-400 hover:text-white"
        >
          Cancel
        </a>

      </div>

    </form>
  );
}