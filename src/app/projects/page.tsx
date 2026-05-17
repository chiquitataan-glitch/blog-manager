import { ProjectCard } from "@/components/sections/project-card";
import { getAdminProjects } from "@/lib/admin/repositories";

export const dynamic = "force-dynamic";
export const metadata = { title: "项目 | 99blog" };

export default function ProjectsPage() {
  const projects = getAdminProjects();

  return (
    <div className="mx-auto max-w-6xl px-5 py-12">
      <header className="manga-panel rounded-[2rem] p-8">
        <div className="relative z-10">
          <p className="text-sm font-bold tracking-[0.32em] text-orange-700">PROJECTS</p>
          <h1 className="mt-3 text-5xl font-black text-red-950">项目</h1>
          <p className="mt-4 max-w-2xl leading-8 text-stone-700">用海报式卡片记录产品叙事、成果和链接。</p>
        </div>
      </header>
      <div className="mt-8 grid gap-5 md:grid-cols-2">{projects.map((project) => <ProjectCard key={project.slug} project={project} />)}</div>
    </div>
  );
}
