"use client";

import { useMemo, useState } from "react";
import { PostCard } from "@/components/posts/post-card";
import type { PostMeta } from "@/lib/posts";

export function PostsExplorer({ posts }: { posts: PostMeta[] }) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("全部");
  const categories = ["全部", ...Array.from(new Set(posts.map((post) => post.category)))];

  const filteredPosts = useMemo(() => {
    return posts.filter((post) => {
      const matchesCategory = category === "全部" || post.category === category;
      const text = `${post.title} ${post.summary} ${post.category}`.toLowerCase();
      return matchesCategory && text.includes(query.trim().toLowerCase());
    });
  }, [category, posts, query]);

  return (
    <div>
      <div className="rounded-3xl border border-orange-100 bg-white/80 p-5 shadow-lg shadow-rose-950/5">
        <input
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="搜索文章标题、摘要、分类..."
          className="w-full rounded-2xl border border-orange-100 bg-orange-50/70 px-4 py-3 outline-none transition focus:border-orange-300"
        />
        <div className="mt-4 flex flex-wrap gap-2">
          {categories.map((item) => (
            <button
              key={item}
              onClick={() => setCategory(item)}
              className={`rounded-full px-4 py-2 text-sm font-semibold transition ${category === item ? "bg-red-800 text-white" : "bg-rose-100 text-red-900 hover:bg-rose-200"}`}
            >
              {item}
            </button>
          ))}
        </div>
      </div>
      <div className="mt-6 grid gap-5 md:grid-cols-2">
        {filteredPosts.map((post) => <PostCard key={post.slug} post={post} />)}
      </div>
    </div>
  );
}
