import { notFound } from "next/navigation";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { supabase } from "@/lib/supabase";

function formatDate(dateStr: string | null) {
  if (!dateStr) return "";
  return new Date(dateStr).toLocaleDateString("en-CA", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const { data: post, error } = await supabase
    .from("posts")
    .select("*")
    .eq("slug", slug)
    .single();

  if (!post || error) notFound();

  return (
    <>
      <Navbar />
      <main className="flex-1" style={{ background: "#050d1a", minHeight: "100vh" }}>
        {/* Featured image */}
        {post.featured_image && (
          <div className="w-full" style={{ maxHeight: "480px", overflow: "hidden" }}>
            <img
              src={post.featured_image}
              alt={post.title}
              className="w-full object-cover"
              style={{ maxHeight: "480px" }}
            />
          </div>
        )}

        <div className="max-w-3xl mx-auto px-4 py-16">
          {/* Back link */}
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-sm font-semibold mb-8 transition-colors hover:opacity-80"
            style={{ color: "#C9A84C" }}
          >
            ← Back to Blog
          </Link>

          {/* Category */}
          {post.category && (
            <span
              className="inline-block text-xs font-semibold uppercase tracking-wider px-3 py-1 rounded-full mb-4"
              style={{
                background: "#1a3a6b",
                color: "#C9A84C",
                border: "1px solid rgba(201,168,76,0.3)",
              }}
            >
              {post.category}
            </span>
          )}

          {/* Title */}
          <h1
            className="text-4xl md:text-5xl font-bold text-white mb-5 leading-tight"
            style={{ fontFamily: "var(--font-playfair)" }}
          >
            {post.title}
          </h1>

          {/* Meta */}
          <div className="flex items-center gap-4 mb-10 pb-6" style={{ borderBottom: "1px solid rgba(201,168,76,0.15)" }}>
            {post.author && (
              <span className="text-sm font-medium" style={{ color: "#C9A84C" }}>
                {post.author}
              </span>
            )}
            {post.published_at && (
              <span className="text-sm" style={{ color: "#6b7280" }}>
                {formatDate(post.published_at)}
              </span>
            )}
          </div>

          {/* Content */}
          {post.content && (
            <div
              className="prose-blog text-base leading-relaxed"
              style={{ color: "#e8dfc8" }}
              dangerouslySetInnerHTML={{ __html: post.content }}
            />
          )}

          {/* Back link bottom */}
          <div className="mt-16 pt-8" style={{ borderTop: "1px solid rgba(201,168,76,0.15)" }}>
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-sm font-semibold transition-colors hover:opacity-80"
              style={{ color: "#C9A84C" }}
            >
              ← Back to Blog
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
