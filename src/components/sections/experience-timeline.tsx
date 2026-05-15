import type { Experience } from "@/data/experience";

export function ExperienceTimeline({ experiences }: { experiences: Experience[] }) {
  return (
    <div className="grid gap-5">
      {experiences.map((item, index) => (
        <article key={`${item.type}-${item.title}`} className="paper-card rounded-[1.6rem] p-6 transition hover:-translate-y-1">
          <div className="flex items-center gap-4">
            <span className="grid h-12 w-12 place-items-center rounded-full bg-red-900 font-black text-white">{index + 1}</span>
            <div>
              <p className="text-xs font-bold tracking-[0.24em] text-orange-700">{item.type}</p>
              <h3 className="text-2xl font-black text-red-950">{item.title}</h3>
              <p className="mt-1 text-sm font-bold text-stone-500">{item.organization} · {item.period}</p>
            </div>
          </div>
          <p className="mt-4 leading-8 text-stone-700">{item.summary}</p>
          <div className="mt-4 flex flex-wrap gap-2">
            {item.highlights.map((highlight) => (
              <span key={highlight} className="rounded-full bg-orange-50 px-3 py-1 text-xs font-bold text-red-900">{highlight}</span>
            ))}
          </div>
        </article>
      ))}
    </div>
  );
}
