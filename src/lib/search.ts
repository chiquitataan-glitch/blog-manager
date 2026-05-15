import { experiences } from "@/data/experience";
import { projects } from "@/data/projects";
import { getSortedPostsMeta } from "@/lib/posts";

export type SearchItem = {
  type: "文章" | "项目" | "经历";
  title: string;
  summary: string;
  href: string;
  keywords: string[];
};

export function getSearchIndex(): SearchItem[] {
  const posts = getSortedPostsMeta().map((post) => ({
    type: "文章" as const,
    title: post.title,
    summary: post.summary,
    href: `/posts/${post.slug}`,
    keywords: [post.category, post.title, post.summary],
  }));

  const projectItems = projects.map((project) => ({
    type: "项目" as const,
    title: project.name,
    summary: project.intro,
    href: "/projects",
    keywords: [
      project.name,
      project.intro,
      project.problem,
      project.value,
      project.status,
      ...project.techStack,
    ],
  }));

  const experienceItems = experiences.map((experience) => ({
    type: "经历" as const,
    title: experience.title,
    summary: experience.summary,
    href: "/experience",
    keywords: [
      experience.type,
      experience.title,
      experience.organization,
      experience.summary,
      ...experience.highlights,
    ],
  }));

  return [...posts, ...projectItems, ...experienceItems];
}

export function searchSite(query: string): SearchItem[] {
  const normalizedQuery = query.trim().toLowerCase();
  if (!normalizedQuery) return getSearchIndex();

  return getSearchIndex().filter((item) =>
    [item.title, item.summary, ...item.keywords]
      .join(" ")
      .toLowerCase()
      .includes(normalizedQuery),
  );
}
