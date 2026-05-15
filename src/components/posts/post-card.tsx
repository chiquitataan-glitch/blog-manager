import Link from "next/link";
import type { PostMeta } from "@/lib/posts";

export function PostCard({ post }: { post: PostMeta }) {
  return (
    <Link href={`/posts/${post.slug}`} className="manga-panel group block rounded-[1.5rem] p-5 transition hover:-translate-y-1">
      <div className="relative z-10">
        <div className="flex items-center justify-between gap-3 text-xs text-orange-700">
          <span className="rounded-full bg-rose-100 px-3 py-1 font-bold text-red-900">{post.category}</span>
          <span>{post.date}</span>
        </div>
        <h3 className="mt-5 text-2xl font-black text-red-950 group-hover:text-red-700">{post.title}</h3>
        <p className="mt-3 line-clamp-2 leading-7 text-stone-700">{post.summary}</p>
      </div>
    </Link>
  );
}
