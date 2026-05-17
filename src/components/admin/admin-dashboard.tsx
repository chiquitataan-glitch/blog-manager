"use client";

import { useEffect, useMemo, useState } from "react";
import type { Experience } from "@/data/experience";
import type { Project, ProjectLink } from "@/data/projects";

type AdminSection = "overview" | "profile" | "links" | "projects" | "experiences" | "posts" | "assets" | "wechat";

type AdminProfile = {
  name: string;
  alias: string;
  headline: string;
  description: string;
  avatar: string;
  cta: string;
};

type AdminLink = {
  id: number;
  label: string;
  value: string;
  href: string;
  sortOrder: number;
};

type AdminPost = {
  id?: number;
  title: string;
  summary: string;
  category: string;
  content: string;
  cover: string;
  status: string;
};

type AdminAsset = {
  id: number;
  fileName: string;
  publicPath: string;
  mimeType: string;
  size: number;
  createdAt: string;
};

type StatCard = {
  label: string;
  value: number;
  section: AdminSection;
};

const emptyPost: AdminPost = {
  title: "",
  summary: "",
  category: "个人思考",
  content: "",
  cover: "/post-cover-placeholder.svg",
  status: "draft",
};

const emptyProject: Project = {
  slug: "new-project",
  name: "新项目",
  intro: "",
  problem: "",
  targetUsers: "",
  value: "",
  outcome: "",
  techStack: [],
  status: "开发中",
  stage: "MVP",
  releasedAt: "2026-05",
  featured: false,
  media: { cover: "/project-placeholder.svg" },
  links: [],
};

const emptyExperience: Experience = {
  type: "创业实践",
  title: "新经历",
  organization: "",
  period: "",
  summary: "",
  highlights: [],
};

const sections: { id: AdminSection; label: string; description: string }[] = [
  { id: "overview", label: "概览", description: "内容状态与快捷入口" },
  { id: "profile", label: "个人资料", description: "头像、姓名、简介" },
  { id: "links", label: "链接", description: "联系方式和外部入口" },
  { id: "projects", label: "项目", description: "作品与产品实验" },
  { id: "experiences", label: "经历", description: "校园、荣誉、实践" },
  { id: "posts", label: "文案", description: "文章草稿和公众号内容" },
  { id: "assets", label: "图片", description: "上传与路径复制" },
  { id: "wechat", label: "公众号", description: "HTML 生成预览" },
];

const projectStatuses: Project["status"][] = ["构思中", "开发中", "已上线", "长期迭代"];
const experienceTypes: Experience["type"][] = ["校园基础", "活动荣誉", "创业实践", "工作经历"];
const projectLinkKinds: ProjectLink["kind"][] = ["github", "demo", "docs", "video", "other"];

function splitLines(value: string) {
  return value.split("\n").map((item) => item.trim()).filter(Boolean);
}

function joinLines(value: string[]) {
  return value.join("\n");
}

function fieldClassName() {
  return "rounded-2xl border border-orange-100 bg-white p-3 text-red-950 outline-none transition focus:border-orange-300 focus:ring-2 focus:ring-orange-100";
}

function panelClassName() {
  return "rounded-3xl border border-orange-100 bg-white/85 p-6 shadow-lg shadow-rose-950/5";
}

export function AdminDashboard() {
  const [activeSection, setActiveSection] = useState<AdminSection>("overview");
  const [selectedProjectIndex, setSelectedProjectIndex] = useState(0);
  const [selectedExperienceIndex, setSelectedExperienceIndex] = useState(0);
  const [profile, setProfile] = useState<AdminProfile | null>(null);
  const [links, setLinks] = useState<AdminLink[]>([]);
  const [post, setPost] = useState<AdminPost>(emptyPost);
  const [posts, setPosts] = useState<AdminPost[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [assets, setAssets] = useState<AdminAsset[]>([]);
  const [wechatHtml, setWechatHtml] = useState("");
  const [message, setMessage] = useState("准备就绪，本机后台已启动。");

  const avatarPath = useMemo(() => profile?.avatar || "/profile/avatar.webp", [profile]);
  const selectedProject = projects[selectedProjectIndex];
  const selectedExperience = experiences[selectedExperienceIndex];

  const stats: StatCard[] = [
    { label: "链接", value: links.length, section: "links" },
    { label: "项目", value: projects.length, section: "projects" },
    { label: "经历", value: experiences.length, section: "experiences" },
    { label: "文案", value: posts.length, section: "posts" },
    { label: "图片", value: assets.length, section: "assets" },
  ];

  useEffect(() => {
    async function loadData() {
      const [profileResponse, linksResponse, postsResponse, projectsResponse, experienceResponse, assetsResponse] = await Promise.all([
        fetch("/api/admin/profile"),
        fetch("/api/admin/links"),
        fetch("/api/admin/posts"),
        fetch("/api/admin/projects"),
        fetch("/api/admin/experience"),
        fetch("/api/admin/assets"),
      ]);

      setProfile(await profileResponse.json());
      setLinks(await linksResponse.json());
      setPosts(await postsResponse.json());
      setProjects(await projectsResponse.json());
      setExperiences(await experienceResponse.json());
      setAssets(await assetsResponse.json());
    }

    loadData().catch(() => setMessage("后台数据加载失败，请检查开发服务。"));
  }, []);

  async function saveProfile() {
    if (!profile) return;
    await fetch("/api/admin/profile", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(profile),
    });
    setMessage("个人资料已保存。刷新前台即可查看。 ");
  }

  async function saveLinks() {
    await fetch("/api/admin/links", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ links }),
    });
    setMessage("链接已保存。 ");
  }

  async function saveProjects() {
    await fetch("/api/admin/projects", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ projects }),
    });
    setMessage("项目已保存，前台项目页会优先读取后台数据。 ");
  }

  async function saveExperiences() {
    await fetch("/api/admin/experience", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ experiences }),
    });
    setMessage("经历已保存，前台足迹页会优先读取后台数据。 ");
  }

  async function savePost() {
    const response = await fetch("/api/admin/posts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(post),
    });
    const result = (await response.json()) as { id: number };
    setPost({ ...post, id: result.id });
    const postsResponse = await fetch("/api/admin/posts");
    setPosts(await postsResponse.json());
    setMessage("文案已保存到 SQLite。 ");
  }

  async function uploadAsset(file: File) {
    const formData = new FormData();
    formData.append("file", file);
    const response = await fetch("/api/admin/assets", { method: "POST", body: formData });
    const result = (await response.json()) as { publicPath?: string; error?: string };

    if (!response.ok) {
      setMessage(result.error ?? "上传失败。");
      return;
    }

    const assetsResponse = await fetch("/api/admin/assets");
    setAssets(await assetsResponse.json());
    setMessage(`图片已上传：${result.publicPath}`);
  }

  async function generateWechat() {
    const response = await fetch("/api/admin/wechat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title: post.title, content: post.content }),
    });
    const result = (await response.json()) as { html?: string; error?: string };

    if (!response.ok) {
      setMessage(result.error ?? "公众号 HTML 生成失败。");
      return;
    }

    setWechatHtml(result.html ?? "");
    setActiveSection("wechat");
    setMessage("公众号 HTML 已生成，可复制使用。 ");
  }

  function updateLink(index: number, field: keyof Omit<AdminLink, "id" | "sortOrder">, value: string) {
    setLinks((current) => current.map((link, itemIndex) => (itemIndex === index ? { ...link, [field]: value } : link)));
  }

  function updateProject(index: number, value: Project) {
    setProjects((current) => current.map((project, itemIndex) => (itemIndex === index ? value : project)));
  }

  function updateProjectLink(projectIndex: number, linkIndex: number, field: keyof ProjectLink, value: string) {
    setProjects((current) => current.map((project, itemIndex) => {
      if (itemIndex !== projectIndex) return project;
      const projectLinks = project.links.map((link, currentLinkIndex) => (currentLinkIndex === linkIndex ? { ...link, [field]: value } : link));
      return { ...project, links: projectLinks };
    }));
  }

  function updateExperience(index: number, value: Experience) {
    setExperiences((current) => current.map((experience, itemIndex) => (itemIndex === index ? value : experience)));
  }

  function addProject() {
    const nextProject = { ...emptyProject, slug: `new-project-${projects.length + 1}` };
    setProjects((current) => [...current, nextProject]);
    setSelectedProjectIndex(projects.length);
  }

  function addExperience() {
    setExperiences((current) => [...current, emptyExperience]);
    setSelectedExperienceIndex(experiences.length);
  }

  function removeProject(index: number) {
    const updated = projects.filter((_, i) => i !== index);
    setProjects(updated);
    setSelectedProjectIndex(Math.min(selectedProjectIndex, updated.length - 1));
    fetch("/api/admin/projects", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ projects: updated }),
    }).then(() => setMessage("项目已删除。"));
  }

  function removeExperience(index: number) {
    const updated = experiences.filter((_, i) => i !== index);
    setExperiences(updated);
    setSelectedExperienceIndex(Math.min(selectedExperienceIndex, updated.length - 1));
    fetch("/api/admin/experience", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ experiences: updated }),
    }).then(() => setMessage("经历已删除。"));
  }

  function removeLink(index: number) {
    const updated = links.filter((_, i) => i !== index);
    setLinks(updated);
    fetch("/api/admin/links", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ links: updated }),
    }).then(() => setMessage("链接已删除。"));
  }

  function renderOverview() {
    return (
      <section className={panelClassName()}>
        <p className="text-sm font-bold tracking-[0.28em] text-orange-700">DASHBOARD</p>
        <h2 className="mt-3 text-3xl font-black text-red-950">内容概览</h2>
        <p className="mt-3 text-stone-600">朋友们，这里是后台驾驶舱：先看状态，再进模块编辑，清晰管理才是长期维护的关键。</p>
        <div className="mt-6 grid gap-3 md:grid-cols-5">
          {stats.map((stat) => (
            <button key={stat.label} className="rounded-3xl border border-orange-100 bg-orange-50 p-4 text-left transition hover:-translate-y-0.5 hover:bg-orange-100" onClick={() => setActiveSection(stat.section)}>
              <span className="text-sm font-bold text-orange-700">{stat.label}</span>
              <strong className="mt-2 block text-3xl font-black text-red-950">{stat.value}</strong>
            </button>
          ))}
        </div>
        <div className="mt-6 grid gap-3 md:grid-cols-2 lg:grid-cols-4">
          <button className="ink-button rounded-full bg-red-900 px-5 py-3 font-bold text-white" onClick={() => setActiveSection("profile")}>编辑资料</button>
          <button className="ink-button rounded-full border border-red-200 bg-white px-5 py-3 font-bold text-red-950" onClick={() => setActiveSection("projects")}>维护项目</button>
          <button className="ink-button rounded-full border border-red-200 bg-white px-5 py-3 font-bold text-red-950" onClick={() => setActiveSection("experiences")}>维护经历</button>
          <button className="ink-button rounded-full border border-orange-200 bg-orange-50 px-5 py-3 font-bold text-red-950" onClick={() => setActiveSection("posts")}>写公众号文案</button>
        </div>
      </section>
    );
  }

  function renderProfile() {
    if (!profile) return null;

    return (
      <section className={`grid gap-4 ${panelClassName()} md:grid-cols-[180px_1fr]`}>
        <div>
          <div className="overflow-hidden rounded-[2rem] border-4 border-white bg-orange-50 shadow-lg">
            {/* eslint-disable-next-line @next/next/no-img-element -- 本机后台需要即时预览用户填写的本地图片路径。 */}
            <img src={avatarPath} alt="头像预览" className="h-44 w-full object-cover" />
          </div>
          <p className="mt-3 break-all rounded-2xl bg-orange-50 p-3 text-xs font-semibold text-red-950">{avatarPath}</p>
        </div>
        <div className="grid gap-3">
          <h2 className="text-2xl font-black text-red-950">个人资料</h2>
          <input className={fieldClassName()} value={profile.name} onChange={(event) => setProfile({ ...profile, name: event.target.value })} placeholder="姓名" />
          <input className={fieldClassName()} value={profile.alias} onChange={(event) => setProfile({ ...profile, alias: event.target.value })} placeholder="别名" />
          <input className={fieldClassName()} value={profile.headline} onChange={(event) => setProfile({ ...profile, headline: event.target.value })} placeholder="一句话介绍" />
          <input className={fieldClassName()} value={profile.avatar} onChange={(event) => setProfile({ ...profile, avatar: event.target.value })} placeholder="头像路径" />
          <textarea className={`${fieldClassName()} min-h-28`} value={profile.description} onChange={(event) => setProfile({ ...profile, description: event.target.value })} placeholder="个人介绍" />
          <button className="ink-button rounded-full bg-red-900 px-5 py-3 font-bold text-white" onClick={saveProfile}>保存个人资料</button>
        </div>
      </section>
    );
  }

  function renderLinks() {
    return (
      <section className={panelClassName()}>
        <h2 className="text-2xl font-black text-red-950">链接</h2>
        <p className="mt-2 text-sm text-stone-600">用于联系页和外部入口。暂未补齐的链接可以留空，前台会显示为“待补充”。</p>
        <div className="mt-4 grid gap-3">
          {links.map((link, index) => (
            <div key={link.id} className="group grid gap-3 md:grid-cols-[1fr_1fr_1fr_auto]">
              <input className={fieldClassName()} value={link.label} onChange={(event) => updateLink(index, "label", event.target.value)} placeholder="标签" />
              <input className={fieldClassName()} value={link.value} onChange={(event) => updateLink(index, "value", event.target.value)} placeholder="展示值" />
              <input className={fieldClassName()} value={link.href} onChange={(event) => updateLink(index, "href", event.target.value)} placeholder="链接" />
              <button className="flex items-center justify-center rounded-2xl border border-red-200 bg-white px-3 py-3 text-sm font-bold text-red-400 opacity-0 transition hover:bg-red-100 hover:text-red-700 group-hover:opacity-100" onClick={() => removeLink(index)} title="删除链接">✕</button>
            </div>
          ))}
        </div>
        <div className="mt-4 flex gap-3">
          <button className="ink-button rounded-full border border-red-200 bg-white px-5 py-3 font-bold text-red-950" onClick={() => setLinks([...links, { id: Date.now(), label: "", value: "", href: "", sortOrder: links.length }])}>新增链接</button>
          <button className="ink-button rounded-full bg-red-900 px-5 py-3 font-bold text-white" onClick={saveLinks}>保存链接</button>
        </div>
      </section>
    );
  }

  function renderProjects() {
    return (
      <section className={panelClassName()}>
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <h2 className="text-2xl font-black text-red-950">项目</h2>
            <p className="mt-2 text-sm text-stone-600">左侧选择项目，右侧编辑详情；空链接或 # 会在前台显示为“待补充”。</p>
          </div>
          <div className="flex gap-3">
            <button className="ink-button rounded-full border border-red-200 bg-white px-5 py-3 font-bold text-red-950" onClick={addProject}>新增项目</button>
            <button className="ink-button rounded-full bg-red-900 px-5 py-3 font-bold text-white" onClick={saveProjects}>保存项目</button>
          </div>
        </div>
        <div className="mt-5 grid gap-5 lg:grid-cols-[280px_1fr]">
          <div className="grid content-start gap-2">
            {projects.length === 0 && <p className="rounded-2xl bg-orange-50 p-4 text-sm text-stone-600">还没有项目，点击“新增项目”开始。</p>}
            {projects.map((project, index) => (
              <button key={`${project.slug}-${index}`} className={`group flex items-center justify-between rounded-2xl border p-4 text-left transition ${selectedProjectIndex === index ? "border-red-200 bg-red-50" : "border-orange-100 bg-white hover:bg-orange-50"}`} onClick={() => setSelectedProjectIndex(index)}>
                <div>
                  <strong className="block text-red-950">{project.name}</strong>
                  <span className="mt-1 block text-xs font-bold text-orange-700">{project.status} · {project.stage}</span>
                </div>
                <span className="ml-2 flex-shrink-0 rounded-full px-2 py-1 text-xs font-bold text-red-400 opacity-0 transition hover:bg-red-100 hover:text-red-700 group-hover:opacity-100" onClick={(e) => { e.stopPropagation(); removeProject(index); }} title="删除项目">✕</span>
              </button>
            ))}
          </div>
          {selectedProject ? (
            <div className="grid gap-3 rounded-3xl border border-orange-100 bg-orange-50/40 p-4">
              <div className="grid gap-3 md:grid-cols-3">
                <input className={fieldClassName()} value={selectedProject.slug} onChange={(event) => updateProject(selectedProjectIndex, { ...selectedProject, slug: event.target.value })} placeholder="slug" />
                <input className={fieldClassName()} value={selectedProject.name} onChange={(event) => updateProject(selectedProjectIndex, { ...selectedProject, name: event.target.value })} placeholder="项目名" />
                <select className={fieldClassName()} value={selectedProject.status} onChange={(event) => updateProject(selectedProjectIndex, { ...selectedProject, status: event.target.value as Project["status"] })}>
                  {projectStatuses.map((status) => <option key={status} value={status}>{status}</option>)}
                </select>
              </div>
              <div className="grid gap-3 md:grid-cols-3">
                <input className={fieldClassName()} value={selectedProject.stage} onChange={(event) => updateProject(selectedProjectIndex, { ...selectedProject, stage: event.target.value })} placeholder="阶段" />
                <input className={fieldClassName()} value={selectedProject.releasedAt} onChange={(event) => updateProject(selectedProjectIndex, { ...selectedProject, releasedAt: event.target.value })} placeholder="时间" />
                <label className="flex items-center gap-2 rounded-2xl border border-orange-100 bg-white p-3 font-bold text-red-950">
                  <input type="checkbox" checked={selectedProject.featured} onChange={(event) => updateProject(selectedProjectIndex, { ...selectedProject, featured: event.target.checked })} /> 首页重点
                </label>
              </div>
              <textarea className={`${fieldClassName()} min-h-20`} value={selectedProject.intro} onChange={(event) => updateProject(selectedProjectIndex, { ...selectedProject, intro: event.target.value })} placeholder="项目简介" />
              <textarea className={`${fieldClassName()} min-h-20`} value={selectedProject.problem} onChange={(event) => updateProject(selectedProjectIndex, { ...selectedProject, problem: event.target.value })} placeholder="解决的问题" />
              <textarea className={`${fieldClassName()} min-h-20`} value={selectedProject.value} onChange={(event) => updateProject(selectedProjectIndex, { ...selectedProject, value: event.target.value })} placeholder="项目价值" />
              <textarea className={`${fieldClassName()} min-h-20`} value={selectedProject.outcome} onChange={(event) => updateProject(selectedProjectIndex, { ...selectedProject, outcome: event.target.value })} placeholder="项目成果" />
              <input className={fieldClassName()} value={selectedProject.targetUsers} onChange={(event) => updateProject(selectedProjectIndex, { ...selectedProject, targetUsers: event.target.value })} placeholder="目标用户" />
              <input className={fieldClassName()} value={selectedProject.media.cover} onChange={(event) => updateProject(selectedProjectIndex, { ...selectedProject, media: { ...selectedProject.media, cover: event.target.value } })} placeholder="封面路径" />
              <textarea className={`${fieldClassName()} min-h-24 font-mono`} value={joinLines(selectedProject.techStack)} onChange={(event) => updateProject(selectedProjectIndex, { ...selectedProject, techStack: splitLines(event.target.value) })} placeholder="技术栈，每行一个" />
              <div className="grid gap-2">
                {selectedProject.links.map((link, linkIndex) => (
                  <div key={`${link.label}-${linkIndex}`} className="grid gap-2 md:grid-cols-[1fr_1fr_140px]">
                    <input className={fieldClassName()} value={link.label} onChange={(event) => updateProjectLink(selectedProjectIndex, linkIndex, "label", event.target.value)} placeholder="链接标签" />
                    <input className={fieldClassName()} value={link.href} onChange={(event) => updateProjectLink(selectedProjectIndex, linkIndex, "href", event.target.value)} placeholder="链接地址" />
                    <select className={fieldClassName()} value={link.kind} onChange={(event) => updateProjectLink(selectedProjectIndex, linkIndex, "kind", event.target.value)}>
                      {projectLinkKinds.map((kind) => <option key={kind} value={kind}>{kind}</option>)}
                    </select>
                  </div>
                ))}
                <button className="rounded-full border border-red-200 bg-white px-4 py-2 text-sm font-bold text-red-950" onClick={() => updateProject(selectedProjectIndex, { ...selectedProject, links: [...selectedProject.links, { label: "新链接", href: "", kind: "other" }] })}>新增项目链接</button>
              </div>
            </div>
          ) : null}
        </div>
      </section>
    );
  }

  function renderExperiences() {
    return (
      <section className={panelClassName()}>
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <h2 className="text-2xl font-black text-red-950">经历</h2>
            <p className="mt-2 text-sm text-stone-600">左侧选择经历，右侧维护组织、时间和亮点。</p>
          </div>
          <div className="flex gap-3">
            <button className="ink-button rounded-full border border-red-200 bg-white px-5 py-3 font-bold text-red-950" onClick={addExperience}>新增经历</button>
            <button className="ink-button rounded-full bg-red-900 px-5 py-3 font-bold text-white" onClick={saveExperiences}>保存经历</button>
          </div>
        </div>
        <div className="mt-5 grid gap-5 lg:grid-cols-[280px_1fr]">
          <div className="grid content-start gap-2">
            {experiences.length === 0 && <p className="rounded-2xl bg-orange-50 p-4 text-sm text-stone-600">还没有经历，点击“新增经历”开始。</p>}
            {experiences.map((experience, index) => (
              <button key={`${experience.type}-${experience.title}-${index}`} className={`group flex items-center justify-between rounded-2xl border p-4 text-left transition ${selectedExperienceIndex === index ? "border-red-200 bg-red-50" : "border-orange-100 bg-white hover:bg-orange-50"}`} onClick={() => setSelectedExperienceIndex(index)}>
                <div>
                  <strong className="block text-red-950">{experience.title}</strong>
                  <span className="mt-1 block text-xs font-bold text-orange-700">{experience.type} · {experience.period || "时间待补充"}</span>
                </div>
                <span className="ml-2 flex-shrink-0 rounded-full px-2 py-1 text-xs font-bold text-red-400 opacity-0 transition hover:bg-red-100 hover:text-red-700 group-hover:opacity-100" onClick={(e) => { e.stopPropagation(); removeExperience(index); }} title="删除经历">✕</span>
              </button>
            ))}
          </div>
          {selectedExperience ? (
            <div className="grid gap-3 rounded-3xl border border-orange-100 bg-orange-50/40 p-4">
              <div className="grid gap-3 md:grid-cols-2">
                <select className={fieldClassName()} value={selectedExperience.type} onChange={(event) => updateExperience(selectedExperienceIndex, { ...selectedExperience, type: event.target.value as Experience["type"] })}>
                  {experienceTypes.map((type) => <option key={type} value={type}>{type}</option>)}
                </select>
                <input className={fieldClassName()} value={selectedExperience.title} onChange={(event) => updateExperience(selectedExperienceIndex, { ...selectedExperience, title: event.target.value })} placeholder="标题" />
              </div>
              <div className="grid gap-3 md:grid-cols-2">
                <input className={fieldClassName()} value={selectedExperience.organization} onChange={(event) => updateExperience(selectedExperienceIndex, { ...selectedExperience, organization: event.target.value })} placeholder="组织 / 项目" />
                <input className={fieldClassName()} value={selectedExperience.period} onChange={(event) => updateExperience(selectedExperienceIndex, { ...selectedExperience, period: event.target.value })} placeholder="时间段" />
              </div>
              <textarea className={`${fieldClassName()} min-h-24`} value={selectedExperience.summary} onChange={(event) => updateExperience(selectedExperienceIndex, { ...selectedExperience, summary: event.target.value })} placeholder="经历摘要" />
              <textarea className={`${fieldClassName()} min-h-24 font-mono`} value={joinLines(selectedExperience.highlights)} onChange={(event) => updateExperience(selectedExperienceIndex, { ...selectedExperience, highlights: splitLines(event.target.value) })} placeholder="亮点，每行一个" />
            </div>
          ) : null}
        </div>
      </section>
    );
  }

  function renderPosts() {
    return (
      <section className={`grid gap-6 ${panelClassName()} lg:grid-cols-[1fr_280px]`}>
        <div className="grid gap-3">
          <h2 className="text-2xl font-black text-red-950">文案 / 文章</h2>
          <input className={fieldClassName()} value={post.title} onChange={(event) => setPost({ ...post, title: event.target.value })} placeholder="标题" />
          <input className={fieldClassName()} value={post.summary} onChange={(event) => setPost({ ...post, summary: event.target.value })} placeholder="摘要" />
          <input className={fieldClassName()} value={post.category} onChange={(event) => setPost({ ...post, category: event.target.value })} placeholder="分类" />
          <input className={fieldClassName()} value={post.cover} onChange={(event) => setPost({ ...post, cover: event.target.value })} placeholder="封面路径" />
          <textarea className={`${fieldClassName()} min-h-80 font-mono`} value={post.content} onChange={(event) => setPost({ ...post, content: event.target.value })} placeholder="在这里写 Markdown 文案" />
          <div className="flex flex-wrap gap-3">
            <button className="ink-button rounded-full bg-red-900 px-5 py-3 font-bold text-white" onClick={savePost}>保存文案</button>
            <button className="ink-button rounded-full border border-red-200 bg-white px-5 py-3 font-bold text-red-950" onClick={generateWechat}>生成公众号 HTML</button>
            <button className="ink-button rounded-full border border-orange-200 bg-orange-50 px-5 py-3 font-bold text-red-950" onClick={() => navigator.clipboard.writeText(wechatHtml)}>复制 HTML</button>
          </div>
        </div>
        <div>
          <h3 className="font-black text-red-950">已保存文案</h3>
          <div className="mt-3 grid gap-2">
            {posts.map((item) => (
              <button key={item.id} className="rounded-2xl border border-orange-100 bg-white p-3 text-left text-sm text-stone-700 transition hover:bg-orange-50" onClick={() => setPost(item)}>
                <strong className="block text-red-950">{item.title}</strong>
                {item.category}
              </button>
            ))}
          </div>
        </div>
      </section>
    );
  }

  function renderAssets() {
    return (
      <section className={panelClassName()}>
        <h2 className="text-2xl font-black text-red-950">图片上传</h2>
        <p className="mt-2 text-sm text-stone-600">上传后复制 public 路径，用于头像、项目封面或文章封面。</p>
        <input className="mt-4 block w-full rounded-2xl border border-orange-100 bg-white p-3" type="file" accept="image/*" onChange={(event) => event.target.files?.[0] && uploadAsset(event.target.files[0])} />
        <div className="mt-4 grid gap-3 md:grid-cols-3">
          {assets.map((asset) => (
            <div key={asset.id} className="rounded-2xl border border-orange-100 bg-white p-3">
              {/* eslint-disable-next-line @next/next/no-img-element -- 后台上传列表需要直接预览刚上传的 public 路径。 */}
              <img src={asset.publicPath} alt={asset.fileName} className="h-32 w-full rounded-xl object-cover" />
              <code className="mt-2 block break-all text-xs text-stone-600">{asset.publicPath}</code>
            </div>
          ))}
        </div>
      </section>
    );
  }

  function renderWechatPreview() {
    return (
      <section className={panelClassName()}>
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h2 className="text-2xl font-black text-red-950">公众号 HTML 预览</h2>
            <p className="mt-2 text-sm text-stone-600">先在“文案”模块生成，再到这里预览和复制。</p>
          </div>
          <button className="ink-button rounded-full border border-orange-200 bg-orange-50 px-5 py-3 font-bold text-red-950" onClick={() => navigator.clipboard.writeText(wechatHtml)}>复制 HTML</button>
        </div>
        {wechatHtml ? (
          <div className="mt-4 max-h-[620px] overflow-auto rounded-2xl border border-orange-100 bg-white p-4" dangerouslySetInnerHTML={{ __html: wechatHtml }} />
        ) : (
          <p className="mt-4 rounded-2xl bg-orange-50 p-4 text-sm text-stone-600">当前还没有生成公众号 HTML。</p>
        )}
      </section>
    );
  }

  function renderActiveSection() {
    switch (activeSection) {
      case "profile":
        return renderProfile();
      case "links":
        return renderLinks();
      case "projects":
        return renderProjects();
      case "experiences":
        return renderExperiences();
      case "posts":
        return renderPosts();
      case "assets":
        return renderAssets();
      case "wechat":
        return renderWechatPreview();
      default:
        return renderOverview();
    }
  }

  if (!profile) {
    return <div className="paper-card rounded-3xl p-6 text-red-950">后台加载中...</div>;
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[280px_1fr]">
      <aside className="h-fit rounded-3xl border border-orange-100 bg-white/90 p-5 shadow-lg shadow-rose-950/5 lg:sticky lg:top-6">
        <p className="text-xs font-bold tracking-[0.28em] text-orange-700">LOCAL ADMIN</p>
        <h1 className="mt-3 text-3xl font-black text-red-950">99blog 后台</h1>
        <p className="mt-3 text-sm leading-6 text-stone-600">无密码，仅建议在自己的电脑和本地网络中使用。</p>
        <div className="mt-4 rounded-2xl bg-orange-50 p-3 text-xs font-semibold text-red-950">
          头像路径：<code className="break-all">{avatarPath}</code>
        </div>
        <nav className="mt-5 grid gap-2">
          {sections.map((section) => (
            <button key={section.id} className={`rounded-2xl p-3 text-left transition ${activeSection === section.id ? "bg-red-900 text-white" : "bg-orange-50 text-red-950 hover:bg-orange-100"}`} onClick={() => setActiveSection(section.id)}>
              <strong className="block text-sm">{section.label}</strong>
              <span className={`mt-1 block text-xs ${activeSection === section.id ? "text-white/75" : "text-stone-500"}`}>{section.description}</span>
            </button>
          ))}
        </nav>
      </aside>
      <main className="grid content-start gap-6">
        <section className="rounded-3xl border border-red-100 bg-red-50 p-4 text-sm text-red-900 shadow-sm shadow-rose-950/5">
          <strong className="mr-2">状态</strong>{message}
        </section>
        {renderActiveSection()}
      </main>
    </div>
  );
}
