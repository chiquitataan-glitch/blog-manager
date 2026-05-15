import Link from "next/link";
import type { Project } from "@/data/projects";

function isUsableHref(href: string) {
  return href.trim().length > 0 && href !== "#";
}

export function ProjectCard({ project }: { project: Project }) {
  return (
    <article className="manga-panel group rounded-[1.6rem] p-5 transition hover:-translate-y-1">
      <div className="relative z-10">
        <div className="flex items-center justify-between text-xs">
          <span className="rounded-full bg-red-900 px-3 py-1 font-bold text-white">{project.status}</span>
          <span className="text-orange-700">{project.stage}</span>
        </div>
        <h3 className="mt-5 text-3xl font-black text-red-950">{project.name}</h3>
        <p className="mt-3 line-clamp-2 leading-8 text-stone-700">{project.intro}</p>
        <div className="mt-5 flex flex-wrap gap-2">
          {project.techStack.slice(0, 4).map((tech) => <span key={tech} className="rounded-full bg-orange-50 px-3 py-1 text-xs font-bold text-red-900">{tech}</span>)}
        </div>
        <div className="mt-6 flex flex-wrap gap-3">
          {project.links.map((link) => (
            isUsableHref(link.href) ? (
              <Link key={link.label} href={link.href} className="text-sm font-bold text-orange-700 hover:text-red-800">{link.label}</Link>
            ) : (
              <span key={link.label} className="text-sm font-bold text-stone-400">{link.label} · 待补充</span>
            )
          ))}
        </div>
      </div>
    </article>
  );
}
