"use client";

export default function BlogImage({ src, alt }: { src: string; alt: string }) {
  return (
    <img
      src={src}
      alt={alt}
      loading="lazy"
      className="w-full h-48 object-cover"
      onError={(e) => { e.currentTarget.style.display = "none"; }}
    />
  );
}
