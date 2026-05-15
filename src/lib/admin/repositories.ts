import { profile as staticProfile } from "@/data/profile";
import { links as staticLinks } from "@/data/links";
import { experiences as staticExperiences, type Experience } from "@/data/experience";
import { projects as staticProjects, type Project } from "@/data/projects";
import { getAdminDb } from "./db";

export type AdminProfile = {
  name: string;
  alias: string;
  headline: string;
  description: string;
  avatar: string;
  cta: string;
};

export type AdminLink = {
  id: number;
  label: string;
  value: string;
  href: string;
  sortOrder: number;
};

export type AdminPost = {
  id: number;
  title: string;
  summary: string;
  category: string;
  content: string;
  cover: string;
  status: string;
  createdAt: string;
  updatedAt: string;
};

export type AdminAsset = {
  id: number;
  fileName: string;
  publicPath: string;
  mimeType: string;
  size: number;
  createdAt: string;
};

type ProfileRow = {
  name: string;
  alias: string;
  headline: string;
  description: string;
  avatar: string;
  cta: string;
};

type LinkRow = {
  id: number;
  label: string;
  value: string;
  href: string;
  sort_order: number;
};

type PostRow = {
  id: number;
  title: string;
  summary: string;
  category: string;
  content: string;
  cover: string;
  status: string;
  created_at: string;
  updated_at: string;
};

type AssetRow = {
  id: number;
  file_name: string;
  public_path: string;
  mime_type: string;
  size: number;
  created_at: string;
};

type ProjectRow = {
  id: number;
  slug: string;
  name: string;
  intro: string;
  problem: string;
  target_users: string;
  value: string;
  outcome: string;
  tech_stack: string;
  status: Project["status"];
  stage: string;
  released_at: string;
  featured: number;
  media: string;
  links: string;
};

type ExperienceRow = {
  id: number;
  type: Experience["type"];
  title: string;
  organization: string;
  period: string;
  summary: string;
  highlights: string;
};

function now() {
  return new Date().toISOString();
}

function mapLink(row: LinkRow): AdminLink {
  return {
    id: row.id,
    label: row.label,
    value: row.value,
    href: row.href,
    sortOrder: row.sort_order,
  };
}

function mapPost(row: PostRow): AdminPost {
  return {
    id: row.id,
    title: row.title,
    summary: row.summary,
    category: row.category,
    content: row.content,
    cover: row.cover,
    status: row.status,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

function mapAsset(row: AssetRow): AdminAsset {
  return {
    id: row.id,
    fileName: row.file_name,
    publicPath: row.public_path,
    mimeType: row.mime_type,
    size: row.size,
    createdAt: row.created_at,
  };
}

function parseJson<T>(value: string, fallback: T): T {
  try {
    return JSON.parse(value) as T;
  } catch {
    return fallback;
  }
}

function mapProject(row: ProjectRow): Project {
  return {
    slug: row.slug,
    name: row.name,
    intro: row.intro,
    problem: row.problem,
    targetUsers: row.target_users,
    value: row.value,
    outcome: row.outcome,
    techStack: parseJson<string[]>(row.tech_stack, []),
    status: row.status,
    stage: row.stage,
    releasedAt: row.released_at,
    featured: Boolean(row.featured),
    media: parseJson<Project["media"]>(row.media, { cover: "/project-placeholder.svg" }),
    links: parseJson<Project["links"]>(row.links, []),
  };
}

function mapExperience(row: ExperienceRow): Experience {
  return {
    type: row.type,
    title: row.title,
    organization: row.organization,
    period: row.period,
    summary: row.summary,
    highlights: parseJson<string[]>(row.highlights, []),
  };
}

function normalizeProject(project: Project): Project {
  return {
    ...project,
    techStack: project.techStack.filter(Boolean),
    media: { cover: project.media.cover || "/project-placeholder.svg", logo: project.media.logo || undefined, video: project.media.video || undefined },
    links: project.links.filter((link) => link.label.trim().length > 0),
  };
}

function normalizeExperience(experience: Experience): Experience {
  return {
    ...experience,
    highlights: experience.highlights.filter(Boolean),
  };
}

export function getAdminProfile(): AdminProfile {
  const row = getAdminDb().prepare("SELECT name, alias, headline, description, avatar, cta FROM admin_profile WHERE id = 1").get() as
    | ProfileRow
    | undefined;

  if (row) return row;

  return {
    name: staticProfile.name,
    alias: staticProfile.alias,
    headline: staticProfile.headline,
    description: staticProfile.description,
    avatar: staticProfile.avatar,
    cta: staticProfile.cta,
  };
}

export function saveAdminProfile(profile: AdminProfile) {
  getAdminDb()
    .prepare(`
      INSERT INTO admin_profile (id, name, alias, headline, description, avatar, cta, updated_at)
      VALUES (1, @name, @alias, @headline, @description, @avatar, @cta, @updatedAt)
      ON CONFLICT(id) DO UPDATE SET
        name = excluded.name,
        alias = excluded.alias,
        headline = excluded.headline,
        description = excluded.description,
        avatar = excluded.avatar,
        cta = excluded.cta,
        updated_at = excluded.updated_at
    `)
    .run({ ...profile, updatedAt: now() });
}

export function getAdminLinks(): AdminLink[] {
  const rows = getAdminDb().prepare("SELECT id, label, value, href, sort_order FROM admin_links ORDER BY sort_order ASC, id ASC").all() as LinkRow[];

  if (rows.length > 0) return rows.map(mapLink);

  return staticLinks.map((link, index) => ({
    id: index + 1,
    label: link.label,
    value: link.value,
    href: link.href,
    sortOrder: index,
  }));
}

export function replaceAdminLinks(links: Omit<AdminLink, "id">[]) {
  const db = getAdminDb();
  const transaction = db.transaction(() => {
    db.prepare("DELETE FROM admin_links").run();
    const statement = db.prepare(`
      INSERT INTO admin_links (label, value, href, sort_order, updated_at)
      VALUES (@label, @value, @href, @sortOrder, @updatedAt)
    `);

    links.forEach((link, index) => {
      statement.run({ ...link, sortOrder: index, updatedAt: now() });
    });
  });

  transaction();
}

export function getAdminPosts(): AdminPost[] {
  return (getAdminDb()
    .prepare("SELECT id, title, summary, category, content, cover, status, created_at, updated_at FROM admin_posts ORDER BY updated_at DESC")
    .all() as PostRow[]).map(mapPost);
}

export function saveAdminPost(post: Partial<AdminPost> & Pick<AdminPost, "title" | "summary" | "category" | "content" | "cover" | "status">) {
  const timestamp = now();

  if (post.id) {
    getAdminDb()
      .prepare(`
        UPDATE admin_posts
        SET title = @title,
          summary = @summary,
          category = @category,
          content = @content,
          cover = @cover,
          status = @status,
          updated_at = @updatedAt
        WHERE id = @id
      `)
      .run({ ...post, updatedAt: timestamp });
    return post.id;
  }

  const result = getAdminDb()
    .prepare(`
      INSERT INTO admin_posts (title, summary, category, content, cover, status, created_at, updated_at)
      VALUES (@title, @summary, @category, @content, @cover, @status, @createdAt, @updatedAt)
    `)
    .run({ ...post, createdAt: timestamp, updatedAt: timestamp });

  return Number(result.lastInsertRowid);
}

export function getAdminPostById(id: number): AdminPost | undefined {
  const row = getAdminDb()
    .prepare("SELECT id, title, summary, category, content, cover, status, created_at, updated_at FROM admin_posts WHERE id = ?")
    .get(id) as PostRow | undefined;

  return row ? mapPost(row) : undefined;
}

export function getAdminAssets(): AdminAsset[] {
  return (getAdminDb()
    .prepare("SELECT id, file_name, public_path, mime_type, size, created_at FROM admin_assets ORDER BY created_at DESC")
    .all() as AssetRow[]).map(mapAsset);
}

export function saveAdminAsset(asset: Omit<AdminAsset, "id" | "createdAt">) {
  const result = getAdminDb()
    .prepare(`
      INSERT INTO admin_assets (file_name, public_path, mime_type, size, created_at)
      VALUES (@fileName, @publicPath, @mimeType, @size, @createdAt)
    `)
    .run({ ...asset, createdAt: now() });

  return Number(result.lastInsertRowid);
}

export function getAdminProjects(): Project[] {
  const rows = getAdminDb()
    .prepare("SELECT id, slug, name, intro, problem, target_users, value, outcome, tech_stack, status, stage, released_at, featured, media, links FROM admin_projects ORDER BY sort_order ASC, id ASC")
    .all() as ProjectRow[];

  return rows.length > 0 ? rows.map(mapProject) : staticProjects;
}

export function replaceAdminProjects(projects: Project[]) {
  const db = getAdminDb();
  const transaction = db.transaction(() => {
    db.prepare("DELETE FROM admin_projects").run();
    const statement = db.prepare(`
      INSERT INTO admin_projects (
        slug, name, intro, problem, target_users, value, outcome, tech_stack,
        status, stage, released_at, featured, media, links, sort_order, updated_at
      ) VALUES (
        @slug, @name, @intro, @problem, @targetUsers, @value, @outcome, @techStack,
        @status, @stage, @releasedAt, @featured, @media, @links, @sortOrder, @updatedAt
      )
    `);

    projects.map(normalizeProject).forEach((project, index) => {
      statement.run({
        ...project,
        techStack: JSON.stringify(project.techStack),
        featured: project.featured ? 1 : 0,
        media: JSON.stringify(project.media),
        links: JSON.stringify(project.links),
        sortOrder: index,
        updatedAt: now(),
      });
    });
  });

  transaction();
}

export function getAdminExperiences(): Experience[] {
  const rows = getAdminDb()
    .prepare("SELECT id, type, title, organization, period, summary, highlights FROM admin_experiences ORDER BY sort_order ASC, id ASC")
    .all() as ExperienceRow[];

  return rows.length > 0 ? rows.map(mapExperience) : staticExperiences;
}

export function replaceAdminExperiences(experiences: Experience[]) {
  const db = getAdminDb();
  const transaction = db.transaction(() => {
    db.prepare("DELETE FROM admin_experiences").run();
    const statement = db.prepare(`
      INSERT INTO admin_experiences (type, title, organization, period, summary, highlights, sort_order, updated_at)
      VALUES (@type, @title, @organization, @period, @summary, @highlights, @sortOrder, @updatedAt)
    `);

    experiences.map(normalizeExperience).forEach((experience, index) => {
      statement.run({
        ...experience,
        highlights: JSON.stringify(experience.highlights),
        sortOrder: index,
        updatedAt: now(),
      });
    });
  });

  transaction();
}
