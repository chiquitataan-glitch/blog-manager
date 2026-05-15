import { MDXRemote } from "next-mdx-remote/rsc";
import { notFound } from "next/navigation";
import { getAllPostSlugs, getPostBySlug, type Post } from "@/lib/posts";

export function generateStaticParams() {
  return getAllPostSlugs().map((fileName) => ({ slug: fileName.replace(/\.mdx$/, "") }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  try {
    const post = getPostBySlug(slug);
    return { title: `${post.title} | 99blog`, description: post.summary };
  } catch {
    return { title: "文章不存在 | 99blog" };
  }
}

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  let post: Post;

  try {
    post = getPostBySlug(slug);
  } catch {
    notFound();
  }

  return (
    <article className="mx-auto max-w-3xl px-5 py-12">
      <div className="rounded-[2rem] border border-orange-100 bg-white/82 p-7 shadow-xl shadow-rose-950/10 md:p-10">
        <p className="text-sm font-semibold tracking-[0.28em] text-orange-700">{post.category}</p>
        <h1 className="mt-4 text-4xl font-black leading-tight text-red-950 md:text-6xl">{post.title}</h1>
        <p className="mt-5 leading-8 text-stone-700">{post.summary}</p>
        <div className="mt-5 flex gap-4 text-sm text-stone-500">
          <span>{post.date}</span>
          <span>{post.readingMinutes} 分钟阅读</span>
        </div>
        <div className="my-8 h-px bg-gradient-to-r from-rose-300 via-orange-300 to-transparent" />
        <div className="prose-blog">
          <MDXRemote source={post.content} />
        </div>
      </div>
    </article>
  );
}
