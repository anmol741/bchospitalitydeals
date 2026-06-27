"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { supabase, type Post } from "@/lib/supabase";

const ADMIN_PASSWORD = "BCH2026admin";

function formatDate(dateStr: string | null) {
  if (!dateStr) return "—";
  return new Date(dateStr).toLocaleDateString("en-CA", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export default function AdminPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(false);
  const [deleting, setDeleting] = useState<string | null>(null);

  useEffect(() => {
    const stored = sessionStorage.getItem("bch_admin_logged_in");
    if (stored === "true") setIsLoggedIn(true);
  }, []);

  const fetchPosts = useCallback(async () => {
    setLoading(true);
    const { data } = await supabase
      .from("posts")
      .select("*")
      .order("created_at", { ascending: false });
    setPosts(data ?? []);
    setLoading(false);
  }, []);

  useEffect(() => {
    if (isLoggedIn) fetchPosts();
  }, [isLoggedIn, fetchPosts]);

  function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      sessionStorage.setItem("bch_admin_logged_in", "true");
      setIsLoggedIn(true);
      setPasswordError("");
    } else {
      setPasswordError("Incorrect password.");
    }
  }

  function handleLogout() {
    sessionStorage.removeItem("bch_admin_logged_in");
    setIsLoggedIn(false);
  }

  async function handleDelete(post: Post) {
    if (!confirm(`Delete "${post.title}"? This cannot be undone.`)) return;
    setDeleting(post.id);
    await supabase.from("posts").delete().eq("id", post.id);
    await fetchPosts();
    setDeleting(null);
  }

  if (!isLoggedIn) {
    return (
      <div
        className="min-h-screen flex items-center justify-center px-4"
        style={{ background: "#050d1a" }}
      >
        <div
          className="w-full max-w-sm rounded-2xl p-8"
          style={{ background: "#0d1f3c", border: "1px solid rgba(201,168,76,0.2)" }}
        >
          <h1
            className="text-2xl font-bold text-white mb-6 text-center"
            style={{ fontFamily: "var(--font-playfair)" }}
          >
            Admin Login
          </h1>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1.5" style={{ color: "#e8dfc8" }}>
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoFocus
                className="w-full px-4 py-3 border border-[#C9A84C]/20 rounded-lg text-white text-sm focus:outline-none focus:border-[#C9A84C] transition-colors"
                style={{ background: "#0a1628" }}
                placeholder="Enter admin password"
              />
              {passwordError && (
                <p className="mt-1.5 text-red-400 text-xs">{passwordError}</p>
              )}
            </div>
            <button
              type="submit"
              className="w-full py-3 font-bold rounded-lg text-sm text-black transition-all hover:opacity-90"
              style={{ background: "linear-gradient(135deg, #C9A84C, #a8893d)" }}
            >
              Login
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen px-4 py-10" style={{ background: "#050d1a" }}>
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <h1
            className="text-3xl font-bold text-white"
            style={{ fontFamily: "var(--font-playfair)" }}
          >
            Blog Admin
          </h1>
          <div className="flex items-center gap-3">
            <Link
              href="/admin/new"
              className="px-5 py-2.5 text-sm font-semibold rounded text-black transition-all hover:opacity-90"
              style={{ background: "linear-gradient(135deg, #C9A84C, #a8893d)" }}
            >
              + Create New Post
            </Link>
            <button
              onClick={handleLogout}
              className="px-4 py-2.5 text-sm font-medium rounded border transition-colors hover:bg-white/5"
              style={{ color: "#94a3b8", borderColor: "rgba(201,168,76,0.2)" }}
            >
              Logout
            </button>
          </div>
        </div>

        {/* Table */}
        <div
          className="rounded-xl overflow-hidden"
          style={{ border: "1px solid rgba(201,168,76,0.15)" }}
        >
          {loading ? (
            <div className="flex justify-center py-16">
              <svg className="w-8 h-8 animate-spin" style={{ color: "#C9A84C" }} fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
            </div>
          ) : posts.length === 0 ? (
            <div className="text-center py-16" style={{ color: "#94a3b8" }}>
              No posts yet.{" "}
              <Link href="/admin/new" style={{ color: "#C9A84C" }}>
                Create your first post →
              </Link>
            </div>
          ) : (
            <table className="w-full text-sm">
              <thead>
                <tr style={{ background: "#0d1f3c", borderBottom: "1px solid rgba(201,168,76,0.15)" }}>
                  {["Title", "Category", "Status", "Date", "Actions"].map((h) => (
                    <th
                      key={h}
                      className="text-left px-5 py-3 font-semibold uppercase tracking-wider text-xs"
                      style={{ color: "#C9A84C" }}
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {posts.map((post, i) => (
                  <tr
                    key={post.id}
                    style={{
                      background: i % 2 === 0 ? "#0a1628" : "#050d1a",
                      borderBottom: "1px solid rgba(201,168,76,0.08)",
                    }}
                  >
                    <td className="px-5 py-4 text-white font-medium max-w-xs truncate">
                      {post.title}
                    </td>
                    <td className="px-5 py-4" style={{ color: "#94a3b8" }}>
                      {post.category || "—"}
                    </td>
                    <td className="px-5 py-4">
                      <span
                        className="px-2.5 py-1 rounded-full text-xs font-semibold uppercase"
                        style={{
                          background: post.status === "published" ? "rgba(34,197,94,0.15)" : "rgba(201,168,76,0.15)",
                          color: post.status === "published" ? "#4ade80" : "#C9A84C",
                        }}
                      >
                        {post.status}
                      </span>
                    </td>
                    <td className="px-5 py-4 text-xs" style={{ color: "#6b7280" }}>
                      {formatDate(post.published_at)}
                    </td>
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-2">
                        <Link
                          href={`/admin/edit/${post.slug}`}
                          className="px-3 py-1.5 text-xs font-semibold rounded border transition-colors hover:bg-[#C9A84C]/10"
                          style={{ color: "#C9A84C", borderColor: "rgba(201,168,76,0.3)" }}
                        >
                          Edit
                        </Link>
                        <button
                          onClick={() => handleDelete(post)}
                          disabled={deleting === post.id}
                          className="px-3 py-1.5 text-xs font-semibold rounded border transition-colors hover:bg-red-500/10 disabled:opacity-40"
                          style={{ color: "#f87171", borderColor: "rgba(248,113,113,0.3)" }}
                        >
                          {deleting === post.id ? "..." : "Delete"}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}
