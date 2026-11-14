"use client";

import { useState } from "react";

interface UploadFormProps {
  onSubmit: (description: string, images: string[]) => void;
  loading: boolean;
}

export function UploadForm({ onSubmit, loading }: UploadFormProps) {
  const [description, setDescription] = useState("");
  const [images, setImages] = useState<File[]>([]);
  const [imageBase64s, setImageBase64s] = useState<string[]>([]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.currentTarget.files || []);
    setImages(files);

    Promise.all(
      files.map(
        (file) =>
          new Promise<string>((resolve) => {
            const reader = new FileReader();
            reader.onload = (event) => {
              const base64 = (event.target?.result as string)?.split(",")[1];
              resolve(base64);
            };
            reader.readAsDataURL(file);
          })
      )
    ).then(setImageBase64s);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!description.trim()) {
      alert("Please describe your project");
      return;
    }
    onSubmit(description, imageBase64s);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className="block text-sm font-medium mb-2">
          What do you want to build?
        </label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="e.g., A quadcopter drone that can carry a 500g payload for outdoor delivery..."
          className="w-full h-32 p-4 bg-slate-600 border border-slate-500 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          disabled={loading}
        />
        <p className="text-xs text-slate-400 mt-1">
          {description.length} / 5000 characters
        </p>
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">
          Upload sketches or images (optional)
        </label>
        <input
          type="file"
          multiple
          accept="image/*,.pdf"
          onChange={handleImageChange}
          className="block w-full text-sm text-slate-400
            file:mr-4 file:py-2 file:px-4
            file:rounded-md file:border-0
            file:text-sm file:font-semibold
            file:bg-blue-600 file:text-white
            hover:file:bg-blue-700
            disabled:opacity-50"
          disabled={loading}
        />
        {images.length > 0 && (
          <p className="text-xs text-slate-400 mt-2">
            {images.length} file(s) selected
          </p>
        )}
      </div>

      <button
        type="submit"
        disabled={loading || !description.trim()}
        className="w-full py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-600 text-white font-semibold rounded-lg transition"
      >
        {loading ? "Generating questions..." : "Get Started"}
      </button>
    </form>
  );
}
