// components/DeleteButton.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

interface DeleteButtonProps {
  applicationId: string;
  label?: string;
}

export default function DeleteButton({
  applicationId,
  label = "Delete",
}: DeleteButtonProps) {
  const router = useRouter();
  const [confirming, setConfirming] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    setLoading(true);
    const res = await fetch(`/api/applications/${applicationId}`, {
      method: "DELETE",
    });

    if (res.ok) {
      router.refresh();
      setTimeout(() => router.push("/dashboard"), 100); // Redirect after a short delay to show the updated state
    } else {
      setLoading(false);
      setConfirming(false);
    }
  };

  if (confirming) {
    return (
      <div className="flex items-center gap-2">
        <span className="text-sm text-gray-600">Are you sure?</span>
        <button
          onClick={handleDelete}
          disabled={loading}
          className="rounded-md bg-red-600 px-3 py-1.5 text-sm font-medium
                     text-white hover:bg-red-700 disabled:opacity-50"
        >
          {loading ? "Deleting…" : "Yes, delete"}
        </button>
        <button
          onClick={() => setConfirming(false)}
          className="rounded-md border border-gray-300 px-3 py-1.5 text-sm
                     font-medium text-gray-700 hover:bg-gray-50"
        >
          Cancel
        </button>
      </div>
    );
  }

  return (
    <button
      onClick={() => setConfirming(true)}
      className="rounded-md border border-red-300 px-3 py-1.5 text-sm
                 font-medium text-red-600 hover:bg-red-50"
    >
      {label}
    </button>
  );
}
