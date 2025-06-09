"use client";

import React, { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
// import { Button } from "./ui/button";

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
  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this paste?")) return;
    setLoading(true);
    try {
      const res = await fetch(`/api/pastes/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Failed to delete paste");
      await fetchPastes();
    } catch (error) {
      console.error(error);
      alert("Failed to delete paste");
    }
    setLoading(false);
  };

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
    <div className="w-full max-w-2xl ">
      <Card className="bg-white/90 dark:bg-purple-950/10 dark:border dark:border-pink-900 backdrop-blur shadow-2xl rounded-xl">
        <CardContent className="p-6 space-y-6">
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <textarea
              rows={6}
              className="w-full p-4 rounded-lg border border-gray-300 dark:border-pink-900 bg-white dark:bg-slate-950 text-gray-800 dark:text-gray-200 resize-none shadow-inner focus:outline-none focus:ring-2 focus:ring-primary transition-all"
              placeholder="edhunaaa sollanum ahh.. apdina type here and save karo."
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
            <button
              type="submit"
              disabled={loading}
              className="bg-primary dark:bg-muted-foreground/20 dark:border dark:border-pink-900 text-white py-2 px-4 rounded-lg font-semibold hover:opacity-90 transition disabled:opacity-50"
            >
              {loading ? "Saving..." : "💾 Save Karo"}
            </button>
          </form>

          <div>
            <h2 className="text-xl font-bold text-center text-gray-800 dark:text-pink-300 mb-4">
              📝
            </h2>
            {pastes.length === 0 ? (
              <p className="text-center text-muted-foreground">
                No pastes yet.
              </p>
            ) : (
              <ul className="space-y-4 overflow-auto border dark:border-pink-900 rounded-lg p-4 bg-muted/10 dark:bg-muted/20">
                {pastes.map((paste) => (
                  <li
                    key={paste._id}
                    className="border-b pb-2 border-muted/40 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2"
                  >
                    <pre className="whitespace-pre-wrap text-s text-gray-700 dark:text-gray-200 flex-1">
                      {paste.content}
                    </pre>
                    <div className="flex items-center justify-between sm:justify-end gap-2 mt-2 sm:mt-0">
                      <small className="text-xs text-gray-500 dark:text-gray-400 whitespace-nowrap">
                        {new Date(paste.createdAt).toLocaleString()}
                      </small>
                      <button
                        onClick={() => handleDelete(paste._id)}
                        className="ml-4 px-3 py-1 rounded-md border-1 border-destructive text-white text-s font-semibold hover:bg-red-700 transition"
                        aria-label={`Delete paste created at ${new Date(
                          paste.createdAt
                        ).toLocaleString()}`}
                        type="button"
                      >
                        🗑️
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
