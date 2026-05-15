import { siteConfig } from "@/data/site";
import type { Post } from "@/lib/posts";

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function markdownToWechatHtml(markdown: string) {
  return markdown
    .split(/\n{2,}/)
    .map((block) => {
      const trimmed = block.trim();
      if (!trimmed) return "";
      if (trimmed.startsWith("## ")) {
        return `<h2 style="margin:28px 0 12px;color:#b8322b;font-size:20px;border-left:4px solid #f97316;padding-left:12px;">${escapeHtml(trimmed.replace(/^## /, ""))}</h2>`;
      }
      if (trimmed.startsWith("# ")) {
        return `<h1 style="margin:28px 0 16px;color:#7f1d1d;font-size:24px;">${escapeHtml(trimmed.replace(/^# /, ""))}</h1>`;
      }
      if (trimmed.startsWith("- ")) {
        const items = trimmed
          .split("\n")
          .map((line) => `<li>${escapeHtml(line.replace(/^- /, ""))}</li>`)
          .join("");
        return `<ul style="padding-left:22px;line-height:1.9;color:#3f2f2a;">${items}</ul>`;
      }
      return `<p style="margin:14px 0;line-height:1.95;color:#3f2f2a;font-size:15px;">${escapeHtml(trimmed)}</p>`;
    })
    .join("\n");
}

export function generateWechatExport(post: Post) {
  const originalUrl = `${siteConfig.origin}/posts/${post.slug}`;
  const body = markdownToWechatHtml(post.content);

  return `<section style="max-width:680px;margin:0 auto;padding:24px;background:#fffaf7;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;">
  <p style="color:#f97316;font-size:13px;letter-spacing:2px;">${escapeHtml(post.category)}</p>
  <h1 style="margin:8px 0 12px;color:#7f1d1d;font-size:26px;line-height:1.35;">${escapeHtml(post.title)}</h1>
  <p style="margin:0 0 24px;color:#9a6b5c;font-size:14px;line-height:1.8;">${escapeHtml(post.summary)}</p>
  <div style="height:1px;background:linear-gradient(90deg,#fb7185,#f97316,transparent);margin:20px 0;"></div>
  ${body}
  <div style="margin-top:30px;padding:16px;border-radius:14px;background:#fff1eb;color:#7f1d1d;font-size:14px;line-height:1.8;">
    原文链接：${escapeHtml(originalUrl)}
  </div>
</section>`;
}
