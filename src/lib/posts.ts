import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import readingTime from "reading-time";

const postsDirectory = path.join(process.cwd(), "src/content/posts");

export type PostMeta = {
  slug: string;
  title: string;
  date: string;
  summary: string;
  category: string;
  cover: string;
  featured: boolean;
  readingMinutes: number;
};

export type Post = PostMeta & {
  content: string;
};

export function getAllPostSlugs() {
  if (!fs.existsSync(postsDirectory)) return [];
  return fs.readdirSync(postsDirectory).filter((name) => name.endsWith(".mdx"));
}

export function getSortedPostsMeta(): PostMeta[] {
  const files = getAllPostSlugs();

  return files
    .map((fileName) => {
      const slug = fileName.replace(/\.mdx$/, "");
      const fullPath = path.join(postsDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, "utf8");
      const { data, content } = matter(fileContents);
      const stats = readingTime(content);

      return {
        slug,
        title: data.title ?? slug,
        date: data.date ?? "",
        summary: data.summary ?? "",
        category: data.category ?? "未分类",
        cover: data.cover ?? "/post-cover-placeholder.svg",
        featured: Boolean(data.featured),
        readingMinutes: Math.max(1, Math.round(stats.minutes)),
      } satisfies PostMeta;
    })
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getPostBySlug(slug: string): Post {
  const fullPath = path.join(postsDirectory, `${slug}.mdx`);
  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);
  const stats = readingTime(content);

  return {
    slug,
    title: data.title ?? slug,
    date: data.date ?? "",
    summary: data.summary ?? "",
    category: data.category ?? "未分类",
    cover: data.cover ?? "/post-cover-placeholder.svg",
    featured: Boolean(data.featured),
    readingMinutes: Math.max(1, Math.round(stats.minutes)),
    content,
  };
}
