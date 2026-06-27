"use client";

export const dynamic = 'force-dynamic';

import { useEffect, useState } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { supabase, type Post } from "@/lib/supabase";

const BADGE_COLORS: Record<string, string> = {
  "Market Updates": "#1a3a6b",
  "Business Tips": "#0d4a2f",
  "BC Interior": "#3a1a6b",
  "Investment Guide": "#6b3a1a",
  "News": "#1a4a4a",
  "Restaurant Business": "#4a1a2f",
};

function formatDate(dateStr: string | null) {
  if (!dateStr) return "";
  return new Date(dateStr).toLocaleDateString("en-CA", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default function BlogPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase
      .from("posts")
      .select("*")
      .eq("status", "published")
      .order("published_at", { ascending: false })
      .then(({ data }) => {
        setPosts(data ?? []);
        setLoading(false);
      });
  }, []);

  return (
    <>
      <Navbar />
      <main className="flex-1" style={{ background: "#050d1a", minHeight: "100vh" }}>
        {/* Header */}
        <section
          className="pt-32 pb-16 px-4 text-center"
          style={{
            background: "radial-gradient(ellipse at 60% 30%, #0d1f3c 0%, #050d1a 60%, #000000 100%)",
            borderBottom: "1px solid rgba(201,168,76,0.2)",
          }}
        >
          <p className="text-xs font-semibold uppercase tracking-widest mb-3" style={{ color: "#C9A84C" }}>
            INSIGHTS & UPDATES
          </p>
          <div className="w-12 h-px mx-auto mb-5" style={{ background: "#C9A84C" }} />
          <h1
            className="text-5xl md:text-6xl font-bold text-white mb-4"
            style={{ fontFamily: "var(--font-playfair)" }}
          >
            BC Hospitality Blog
          </h1>
          <p className="max-w-2xl mx-auto text-base leading-relaxed" style={{ color: "#94a3b8" }}>
            Market insights, investment tips, and hospitality business news across British Columbia
          </p>
        </section>

        {/* Posts grid */}
        <section className="py-16 px-4 max-w-7xl mx-auto">
          {loading ? (
            <div className="flex justify-center py-20">
              <svg className="w-8 h-8 animate-spin" style={{ color: "#C9A84C" }} fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
            </div>
          ) : posts.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-lg" style={{ color: "#94a3b8" }}>No posts yet. Check back soon.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {posts.map((post) => (
                <article
                  key={post.id}
                  className="rounded-xl overflow-hidden flex flex-col transition-transform duration-200 hover:-translate-y-1"
                  style={{
                    background: "linear-gradient(145deg, #0a1628, #0d1f3c)",
                    border: "1px solid rgba(201,168,76,0.15)",
                  }}
                >
                  {/* Image */}
                  {post.featured_image ? (
                    <img
                      src={post.featured_image}
                      alt={post.title}
                      className="w-full h-48 object-cover"
                    />
                  ) : (
                    <div
                      className="w-full h-48 flex items-center justify-center"
                      style={{ background: "#0d1f3c" }}
                    >
                      <svg className="w-12 h-12 opacity-20" fill="#C9A84C" viewBox="0 0 24 24">
                        <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
                      </svg>
                    </div>
                  )}

                  <div className="flex flex-col flex-1 p-5">
                    {/* Category badge */}
                    {post.category && (
                      <span
                        className="self-start text-xs font-semibold uppercase tracking-wider px-3 py-1 rounded-full mb-3"
                        style={{
                          background: BADGE_COLORS[post.category] ?? "#1a3a6b",
                          color: "#C9A84C",
                          border: "1px solid rgba(201,168,76,0.3)",
                        }}
                      >
                        {post.category}
                      </span>
                    )}

                    {/* Title */}
                    <h2
                      className="text-white font-bold text-lg mb-2 leading-snug"
                      style={{ fontFamily: "var(--font-playfair)" }}
                    >
                      {post.title}
                    </h2>

                    {/* Excerpt */}
                    {post.excerpt && (
                      <p className="text-sm leading-relaxed flex-1 mb-4" style={{ color: "#94a3b8" }}>
                        {post.excerpt}
                      </p>
                    )}

                    <div className="flex items-center justify-between mt-auto pt-3" style={{ borderTop: "1px solid rgba(201,168,76,0.1)" }}>
                      {/* Date */}
                      <span className="text-xs" style={{ color: "#6b7280" }}>
                        {formatDate(post.published_at)}
                      </span>

                      {/* Read more */}
                      <Link
                        href={`/blog/${post.slug}`}
                        className="text-sm font-semibold transition-colors hover:opacity-80"
                        style={{ color: "#C9A84C" }}
                      >
                        Read More →
                      </Link>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>
      </main>
      <Footer />
    </>
  );
}
