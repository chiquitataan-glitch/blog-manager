import { ExperienceTimeline } from "@/components/sections/experience-timeline";
import { getAdminExperiences } from "@/lib/admin/repositories";

export const metadata = { title: "足迹 · 经历 | 99blog" };

export default function ExperiencePage() {
  const experiences = getAdminExperiences();

  return (
    <div className="mx-auto max-w-5xl px-5 py-12">
      <header className="manga-panel rounded-[2rem] p-8">
        <div className="relative z-10">
          <p className="text-sm font-bold tracking-[0.32em] text-orange-700">FOOTPRINTS</p>
          <h1 className="mt-3 text-5xl font-black text-red-950">足迹</h1>
          <p className="mt-4 max-w-2xl leading-8 text-stone-700">校园、荣誉、实践与工作经历，以章节节点持续更新。</p>
        </div>
      </header>
      <div className="mt-8"><ExperienceTimeline experiences={experiences} /></div>
    </div>
  );
}
