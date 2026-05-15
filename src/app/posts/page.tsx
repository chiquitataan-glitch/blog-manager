import { PostsExplorer } from "@/components/posts/posts-explorer";
import { getSortedPostsMeta } from "@/lib/posts";

export const metadata = { title: "卷轴 · 文章 | 99blog" };

export default function PostsPage() {
  const posts = getSortedPostsMeta();
  return (
    <div className="mx-auto max-w-6xl px-5 py-12">
      <header className="manga-panel rounded-[2rem] p-8">
        <div className="relative z-10">
          <p className="text-sm font-bold tracking-[0.32em] text-orange-700">SCROLLS</p>
          <h1 className="mt-3 text-5xl font-black text-red-950">卷轴</h1>
          <p className="mt-4 max-w-2xl leading-8 text-stone-700">产品思考、个人思考、AI 原生与创业观察。</p>
        </div>
      </header>
      <div className="mt-8"><PostsExplorer posts={posts} /></div>
    </div>
  );
}
