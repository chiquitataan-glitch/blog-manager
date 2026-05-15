import Link from "next/link";

const navItems = [
  { href: "/", icon: "◐", title: "序幕", subtitle: "首页" },
  { href: "/posts", icon: "▤", title: "卷轴", subtitle: "文章" },
  { href: "/projects", icon: "◇", title: "项目", subtitle: "作品" },
  { href: "/experience", icon: "⌁", title: "足迹", subtitle: "经历" },
  { href: "/about", icon: "◎", title: "自述", subtitle: "关于" },
  { href: "/contact", icon: "✦", title: "驿站", subtitle: "联系" },
];

export function Navbar() {
  return (
    <header className="sticky top-0 z-40 border-b border-white/60 bg-[#fff7ed]/78 shadow-[0_8px_30px_rgba(127,29,29,.06)] backdrop-blur-xl">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-5 py-3">
        <Link href="/" className="group flex items-center gap-3" aria-label="返回首页">
          <span className="grid h-10 w-10 place-items-center rounded-full bg-red-900 text-sm font-bold text-white shadow-lg shadow-red-900/20 transition group-hover:rotate-12">
            九
          </span>
          <span>
            <span className="block text-sm font-semibold tracking-[0.28em] text-red-950">99BLOG</span>
            <span className="block text-xs text-orange-700">清9半斛</span>
          </span>
        </Link>
        <div className="hidden items-center gap-1 md:flex">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              aria-label={item.subtitle}
              className="group flex items-center gap-2 rounded-full px-3 py-2 text-sm text-red-950 transition hover:bg-red-900 hover:text-white"
            >
              <span className="text-base transition group-hover:scale-110">{item.icon}</span>
              <span className="font-semibold">{item.title}</span>
              <span className="text-xs text-orange-700 transition group-hover:text-orange-100">{item.subtitle}</span>
            </Link>
          ))}
        </div>
      </nav>
    </header>
  );
}
