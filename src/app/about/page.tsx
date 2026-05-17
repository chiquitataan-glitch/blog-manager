import Image from "next/image";
import { profile as staticProfile } from "@/data/profile";
import { getAdminProfile } from "@/lib/admin/repositories";

export const dynamic = "force-dynamic";
export const metadata = { title: "自述 · 关于 | 99blog" };

export default function AboutPage() {
  const adminProfile = getAdminProfile();
  const profile = { ...staticProfile, ...adminProfile };

  return (
    <div className="mx-auto max-w-4xl px-5 py-12">
      <section className="manga-panel rounded-[2rem] p-8 md:p-10">
        <div className="relative z-10 grid gap-8 md:grid-cols-[160px_1fr] md:items-start">
          <div className="relative h-36 w-36 overflow-hidden rounded-[2rem] border-4 border-white bg-orange-50 shadow-xl shadow-rose-950/15 md:h-40 md:w-40">
            <Image
              src={profile.avatar}
              alt={`${profile.name} 头像`}
              fill
              sizes="160px"
              className="object-cover"
            />
          </div>
          <div>
            <p className="text-sm font-bold tracking-[0.32em] text-orange-700">ABOUT</p>
            <h1 className="mt-3 text-5xl font-black text-red-950">自述</h1>
            <p className="mt-6 text-xl leading-10 text-stone-700">{profile.description}</p>
            <div className="mt-8 grid gap-4 md:grid-cols-2">
              {profile.skills.map((skill) => <div key={skill} className="paper-card rounded-[1.4rem] p-5 font-bold text-red-950">{skill}</div>)}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
