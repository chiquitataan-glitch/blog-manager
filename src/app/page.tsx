import Link from "next/link";
import { CinematicHero } from "@/components/sections/cinematic-hero";
import { profile as staticProfile } from "@/data/profile";
import { getAdminProfile } from "@/lib/admin/repositories";

const panels = [
  { href: "/posts", icon: "▤", title: "卷轴", text: "产品与个人思考" },
  { href: "/projects", icon: "◇", title: "项目", text: "作品与实验" },
  { href: "/experience", icon: "⌁", title: "足迹", text: "校园与实践" },
  { href: "/contact", icon: "✦", title: "驿站", text: "交流与合作" },
];

export default function Home() {
  const adminProfile = getAdminProfile();
  const profile = { ...staticProfile, ...adminProfile };

  return (
    <div className="mx-auto max-w-6xl px-5 py-10 md:py-14">
      <CinematicHero profile={profile} />
      <section className="mt-8 grid gap-5 md:grid-cols-4">
        {panels.map((panel) => (
          <Link key={panel.href} href={panel.href} className="manga-panel group min-h-56 rounded-[1.6rem] p-6 transition hover:-translate-y-1">
            <div className="relative z-10 flex h-full flex-col justify-between">
              <span className="text-5xl text-red-900 transition group-hover:scale-110">{panel.icon}</span>
              <div>
                <h2 className="text-3xl font-black text-red-950">{panel.title}</h2>
                <p className="mt-2 text-sm font-bold tracking-[0.18em] text-orange-700">{panel.text}</p>
              </div>
            </div>
          </Link>
        ))}
      </section>
    </div>
  );
}
