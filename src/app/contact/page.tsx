import { links as staticLinks } from "@/data/links";
import { profile as staticProfile } from "@/data/profile";
import { getAdminLinks, getAdminProfile } from "@/lib/admin/repositories";

export const metadata = { title: "驿站 · 联系 | 99blog" };

function isUsableHref(href: string) {
  return href.trim().length > 0 && href !== "#";
}

export default function ContactPage() {
  const adminProfile = getAdminProfile();
  const profile = { ...staticProfile, ...adminProfile };
  const adminLinks = getAdminLinks();
  const links = adminLinks.length > 0 ? adminLinks : staticLinks;

  return (
    <div className="mx-auto max-w-4xl px-5 py-12">
      <section className="manga-panel rounded-[2rem] p-8 md:p-10">
        <div className="relative z-10">
          <p className="text-sm font-bold tracking-[0.32em] text-orange-700">CONTACT</p>
          <h1 className="mt-3 text-5xl font-black text-red-950">驿站</h1>
          <p className="mt-5 max-w-2xl text-xl leading-10 text-stone-700">{profile.cta}</p>
          <div className="mt-8 grid gap-4 md:grid-cols-2">
            {profile.contacts.map((contact) => (
              <div key={contact.label} className="paper-card rounded-[1.4rem] p-5">
                <p className="text-sm font-bold text-orange-700">{contact.label}</p>
                <p className="mt-2 text-2xl font-black text-red-950">{contact.value}</p>
              </div>
            ))}
          </div>
          <div className="mt-8 grid gap-3 md:grid-cols-3">
            {links.map((link) => (
              isUsableHref(link.href) ? (
                <a key={link.label} href={link.href} className="ink-button rounded-full bg-red-900 px-5 py-3 text-center font-bold text-white">{link.label}</a>
              ) : (
                <span key={link.label} className="rounded-full border border-orange-100 bg-orange-50 px-5 py-3 text-center font-bold text-stone-500">
                  {link.label} · {link.value || "待补充"}
                </span>
              )
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
