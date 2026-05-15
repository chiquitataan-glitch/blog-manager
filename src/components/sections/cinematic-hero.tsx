import Image from "next/image";
import Link from "next/link";
import { profile as staticProfile } from "@/data/profile";

type CinematicHeroProfile = typeof staticProfile;

export function CinematicHero({ profile }: { profile: CinematicHeroProfile }) {
  return (
    <section className="manga-panel min-h-[430px] rounded-[2rem] bg-[#fff7ed] p-6 md:p-10">
      <div className="relative z-10 grid min-h-[370px] gap-8 md:grid-cols-[1.08fr_.92fr]">
        <div className="flex flex-col justify-center">
          <p className="text-xs font-bold tracking-[0.36em] text-orange-700">PRODUCT · THOUGHT · AI</p>
          <h1 className="mt-5 max-w-2xl text-5xl font-black leading-[1.02] text-red-950 md:text-7xl">
            在噪音里，保留自己的判断。
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-9 text-stone-700">
            {profile.alias} / {profile.name}。{profile.headline}。
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link className="ink-button rounded-full bg-red-900 px-6 py-3 font-bold text-white" href="/posts">阅读卷轴</Link>
            <Link className="ink-button rounded-full border border-red-200 bg-white/70 px-6 py-3 font-bold text-red-950" href="/projects">查看项目</Link>
          </div>
        </div>
        <div className="relative min-h-[320px] overflow-hidden rounded-[1.5rem] border border-orange-200/70 bg-[radial-gradient(circle_at_28%_24%,rgba(251,146,60,.28),transparent_28%),radial-gradient(circle_at_76%_70%,rgba(251,113,133,.22),transparent_34%),linear-gradient(135deg,#fff7ed_0%,#ffe4e6_48%,#fed7aa_100%)] p-6 shadow-[inset_0_0_70px_rgba(127,29,29,.08)]">
          <div className="absolute inset-0 opacity-25 [background-image:radial-gradient(circle,rgba(127,29,29,.24)_1px,transparent_1px)] [background-size:14px_14px]" />
          <div className="relative z-10 flex h-full flex-col justify-between rounded-[1.2rem] border border-white/70 bg-white/45 p-6 backdrop-blur-sm">
            <div className="flex items-start justify-between gap-5">
              <div>
                <p className="text-sm font-black tracking-[0.32em] text-orange-700">99BLOG</p>
                <p className="mt-4 text-3xl font-black leading-tight text-red-950">文章、项目、经历，汇成一个长期作品系统。</p>
              </div>
              <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-[2rem] border-4 border-white bg-orange-50 shadow-xl shadow-rose-950/15 md:h-32 md:w-32">
                <Image
                  src={profile.avatar}
                  alt={`${profile.name} 头像`}
                  fill
                  sizes="(min-width: 768px) 128px, 96px"
                  className="object-cover"
                />
              </div>
            </div>
            <div className="grid gap-3 text-sm font-bold text-stone-700">
              {profile.roles.map((role) => (
                <span key={role} className="rounded-full border border-red-100 bg-white/70 px-4 py-3 text-red-950">
                  {role}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
