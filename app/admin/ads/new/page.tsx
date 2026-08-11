"use client";

import { useState } from "react";

export default function NewAdvertisementPage() {
  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState("");
  const [imageError, setImageError] = useState("");

  const [targetUrl, setTargetUrl] = useState("");
  const [orderedImpressions, setOrderedImpressions] = useState("");
  const [cpm, setCpm] = useState("");

  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  function handleImageChange(
    event: React.ChangeEvent<HTMLInputElement>
  ) {
    const file = event.target.files?.[0] ?? null;

    setImage(file);
    setImagePreview("");
    setImageError("");
    setError("");

    if (!file) {
      return;
    }

    const imageUrl = URL.createObjectURL(file);
    setImagePreview(imageUrl);

    const image = new Image();

    image.onload = () => {
      if (image.width !== 468 || image.height !== 60) {
        setImageError(
          `Invalid banner size: ${image.width} × ${image.height} px. Required size is 468 × 60 px.`
        );
      }
    };

    image.onerror = () => {
      setImageError("The selected file is not a valid image.");
    };

    image.src = imageUrl;
  }

  async function handleSubmit(
    event: React.FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    setError("");
    setSaving(true);

    if (!image) {
      setError("Please select a banner image.");
      setSaving(false);
      return;
    }

    if (imageError) {
      setError(imageError);
      setSaving(false);
      return;
    }

    const formData = new FormData();

    formData.append("image", image);
    formData.append("targetUrl", targetUrl);
    formData.append(
      "orderedImpressions",
      orderedImpressions
    );
    formData.append("cpm", cpm);

    try {
      const response = await fetch(
        "/api/admin/ads",
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await response.json();

      if (!response.ok) {
        setError(
          data.error ??
            "Failed to create advertisement."
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
    <main className="min-h-screen bg-zinc-950 px-6 py-8 text-white">
      <div className="mx-auto max-w-3xl">

        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold text-red-500">
              Add Advertisement
            </h1>

            <p className="mt-2 text-zinc-400">
              Add a new 468 × 60 advertising banner.
            </p>
          </div>

          <a
            href="/admin/ads"
            className="text-sm text-zinc-400 hover:text-red-500"
          >
            ← Advertisements
          </a>
        </div>

        <form
          onSubmit={handleSubmit}
          className="space-y-6 rounded border border-zinc-800 bg-zinc-900 p-6"
        >

          <div>
            <label className="mb-2 block text-sm font-semibold text-zinc-300">
              Banner
            </label>

            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="block w-full rounded border border-zinc-700 bg-zinc-950 px-3 py-2 text-sm text-zinc-300 file:mr-4 file:rounded file:border-0 file:bg-red-600 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-white hover:file:bg-red-500"
            />

            <p className="mt-2 text-xs text-zinc-500">
              Required size: 468 × 60 px.
            </p>

            {image && (
              <p className="mt-2 text-sm text-zinc-400">
                Selected: {image.name}
              </p>
            )}

            {imagePreview && !imageError && (
              <div className="mt-4">
                <p className="mb-2 text-xs text-zinc-500">
                  Preview:
                </p>

                <div className="overflow-hidden rounded border border-zinc-700 bg-black">
                  <img
                    src={imagePreview}
                    alt="Banner preview"
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
              placeholder="https://example.com"
              required
              className="w-full rounded border border-zinc-700 bg-zinc-950 px-3 py-2 text-sm text-white placeholder:text-zinc-600 focus:border-red-600 focus:outline-none"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold text-zinc-300">
              Ordered impressions
            </label>

            <input
              type="number"
              min="1"
              value={orderedImpressions}
              onChange={(event) =>
                setOrderedImpressions(
                  event.target.value
                )
              }
              placeholder="10000"
              required
              className="w-full rounded border border-zinc-700 bg-zinc-950 px-3 py-2 text-sm text-white placeholder:text-zinc-600 focus:border-red-600 focus:outline-none"
            />
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
              placeholder="100.00"
              required
              className="w-full rounded border border-zinc-700 bg-zinc-950 px-3 py-2 text-sm text-white placeholder:text-zinc-600 focus:border-red-600 focus:outline-none"
            />
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
                : "Add Advertisement"}
            </button>

            <a
              href="/admin/ads"
              className="text-sm text-zinc-400 hover:text-white"
            >
              Cancel
            </a>

          </div>

        </form>

      </div>
    </main>
  );
}