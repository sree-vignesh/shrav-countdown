"use client";

import React, { useState, useEffect } from "react";

type Paste = {
  _id: string;
  content: string;
  createdAt: string;
};

export default function Pastebin() {
  const [content, setContent] = useState("");
  const [pastes, setPastes] = useState<Paste[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchPastes = async () => {
    const res = await fetch("/api/pastes");
    const data = await res.json();
    setPastes(data);
  };

  useEffect(() => {
    fetchPastes();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim()) return;

    setLoading(true);
    await fetch("/api/pastes", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ content }),
    });
    setContent("");
    await fetchPastes();
    setLoading(false);
  };

  return (
    <div className="max-w-xl mx-auto p-4 space-y-6">
      <form onSubmit={handleSubmit} className="flex flex-col space-y-2">
        <textarea
          rows={6}
          className="p-2 border rounded-md resize-none"
          placeholder="Paste your text here..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 text-white py-2 rounded hover:bg-blue-700 disabled:opacity-50"
        >
          {loading ? "Saving..." : "Save Paste"}
        </button>
      </form>

      <div>
        <h2 className="text-lg font-semibold mb-2">Recent Pastes</h2>
        {pastes.length === 0 && <p>No pastes yet.</p>}
        <ul className="space-y-4 max-h-64 overflow-auto border p-2 rounded">
          {pastes.map((paste) => (
            <li key={paste._id} className="border-b pb-2">
              <pre className="whitespace-pre-wrap">{paste.content}</pre>
              <small className="text-gray-500">
                {new Date(paste.createdAt).toLocaleString()}
              </small>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
