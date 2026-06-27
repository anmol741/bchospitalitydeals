"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { supabase } from "@/lib/supabase";
import ImageUpload from "@/components/ImageUpload";

const CATEGORIES = [
  "Market Updates",
  "Business Tips",
  "BC Interior",
  "Investment Guide",
  "News",
  "Restaurant Business",
];

function toSlug(title: string) {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

const today = new Date().toISOString().slice(0, 10);

export default function NewPostPage() {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const [form, setForm] = useState({
    title: "",
    slug: "",
    category: "",
    featured_image: "",
    excerpt: "",
    content: "",
    author: "CJ Kalra",
    published_at: today,
    status: "published",
  });

  function set<K extends keyof typeof form>(k: K, v: string) {
    setForm((prev) => ({ ...prev, [k]: v }));
  }

  function handleTitleChange(v: string) {
    setForm((prev) => ({ ...prev, title: v, slug: toSlug(v) }));
  }

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    if (!form.title.trim() || !form.slug.trim()) {
      setError("Title and slug are required.");
      return;
    }
    setSaving(true);
    setError("");
    const { error: err } = await supabase.from("posts").insert([
      {
        title: form.title,
        slug: form.slug,
        category: form.category || null,
        featured_image: form.featured_image || null,
        excerpt: form.excerpt || null,
        content: form.content || null,
        author: form.author || null,
        published_at: form.published_at || null,
        status: form.status,
      },
    ]);
    if (err) {
      setError(err.message);
      setSaving(false);
      return;
    }
    router.push("/admin");
  }

  return (
    <div className="min-h-screen px-4 py-10" style={{ background: "#050d1a" }}>
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1
            className="text-3xl font-bold text-white"
            style={{ fontFamily: "var(--font-playfair)" }}
          >
            Create New Post
          </h1>
          <Link
            href="/admin"
            className="text-sm font-medium transition-colors hover:opacity-80"
            style={{ color: "#94a3b8" }}
          >
            ← Cancel
          </Link>
        </div>

        <form
          onSubmit={handleSave}
          className="space-y-5 rounded-xl p-6 md:p-8"
          style={{ background: "#0d1f3c", border: "1px solid rgba(201,168,76,0.15)" }}
        >
          {error && (
            <div className="p-3 rounded text-sm text-red-400" style={{ background: "rgba(248,113,113,0.1)", border: "1px solid rgba(248,113,113,0.2)" }}>
              {error}
            </div>
          )}

          <Field label="Title *">
            <input
              type="text"
              value={form.title}
              onChange={(e) => handleTitleChange(e.target.value)}
              placeholder="Post title"
              required
              className={INPUT}
              style={BG}
            />
          </Field>

          <Field label="Slug *">
            <input
              type="text"
              value={form.slug}
              onChange={(e) => set("slug", e.target.value)}
              placeholder="post-url-slug"
              required
              className={INPUT}
              style={BG}
            />
          </Field>

          <Field label="Category">
            <div className="relative">
              <select value={form.category} onChange={(e) => set("category", e.target.value)} className={`${INPUT} appearance-none cursor-pointer`} style={BG}>
                <option value="">Select category…</option>
                {CATEGORIES.map((c) => <option key={c}>{c}</option>)}
              </select>
              <svg className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none" style={{ color: "#C9A84C" }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </Field>

          <Field label="Featured Image">
            <ImageUpload
              value={form.featured_image}
              onChange={(v) => set("featured_image", v)}
            />
          </Field>

          <Field label="Excerpt">
            <textarea
              value={form.excerpt}
              onChange={(e) => set("excerpt", e.target.value)}
              placeholder="Short summary shown on the blog listing page"
              rows={3}
              className={`${INPUT} resize-none`}
              style={BG}
            />
          </Field>

          <Field label="Content">
            <textarea
              value={form.content}
              onChange={(e) => set("content", e.target.value)}
              placeholder="Full post content (HTML supported)"
              rows={12}
              className={`${INPUT} resize-y`}
              style={BG}
            />
          </Field>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Field label="Author">
              <input
                type="text"
                value={form.author}
                onChange={(e) => set("author", e.target.value)}
                className={INPUT}
                style={BG}
              />
            </Field>
            <Field label="Published Date">
              <input
                type="date"
                value={form.published_at}
                onChange={(e) => set("published_at", e.target.value)}
                className={INPUT}
                style={BG}
              />
            </Field>
          </div>

          <Field label="Status">
            <div className="flex gap-4">
              {(["published", "draft"] as const).map((s) => (
                <label key={s} className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="status"
                    value={s}
                    checked={form.status === s}
                    onChange={() => set("status", s)}
                    className="sr-only"
                  />
                  <span
                    className={`w-4 h-4 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-colors ${form.status === s ? "border-[#C9A84C] bg-[#C9A84C]" : "border-[#C9A84C]/30"}`}
                  >
                    {form.status === s && <span className="w-1.5 h-1.5 rounded-full bg-[#050d1a]" />}
                  </span>
                  <span className="text-sm capitalize" style={{ color: form.status === s ? "#C9A84C" : "#94a3b8" }}>
                    {s}
                  </span>
                </label>
              ))}
            </div>
          </Field>

          <div className="flex gap-3 pt-2">
            <button
              type="submit"
              disabled={saving}
              className="px-6 py-3 font-bold rounded text-sm text-black transition-all hover:opacity-90 disabled:opacity-50"
              style={{ background: "linear-gradient(135deg, #C9A84C, #a8893d)" }}
            >
              {saving ? "Saving…" : "Publish Post"}
            </button>
            <Link
              href="/admin"
              className="px-6 py-3 font-medium rounded text-sm border transition-colors hover:bg-white/5"
              style={{ color: "#94a3b8", borderColor: "rgba(201,168,76,0.2)" }}
            >
              Cancel
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="block text-sm font-medium mb-1.5" style={{ color: "#e8dfc8" }}>
        {label}
      </label>
      {children}
    </div>
  );
}

const INPUT = "w-full px-4 py-3 border border-[#C9A84C]/20 rounded-lg text-white text-sm focus:outline-none focus:border-[#C9A84C] transition-colors";
const BG: React.CSSProperties = { background: "#0a1628" };
