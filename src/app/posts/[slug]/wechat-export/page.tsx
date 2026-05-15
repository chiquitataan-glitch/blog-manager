import { notFound } from "next/navigation";
import { WechatExportPanel } from "@/components/wechat/wechat-export-panel";
import { generateWechatExport } from "@/lib/wechat-export";
import { getPostBySlug } from "@/lib/posts";

export const metadata = {
  title: "公众号排版导出 | 99blog",
  robots: { index: false, follow: false },
};

export default async function WechatExportPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  let html: string;

  try {
    const post = getPostBySlug(slug);
    html = generateWechatExport(post);
  } catch {
    notFound();
  }

  return (
    <div className="mx-auto max-w-5xl px-5 py-12">
      <WechatExportPanel html={html} />
      <div className="mt-8 overflow-hidden rounded-3xl border border-orange-100 bg-white p-6 shadow-lg shadow-rose-950/5">
        <p className="mb-4 text-sm font-semibold tracking-[0.28em] text-orange-700">PREVIEW</p>
        <div dangerouslySetInnerHTML={{ __html: html }} />
      </div>
    </div>
  );
}
