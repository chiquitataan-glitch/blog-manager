"use client";

import { useState } from "react";

export function WechatExportPanel({ html }: { html: string }) {
  const [copied, setCopied] = useState(false);

  async function copyHtml() {
    await navigator.clipboard.writeText(html);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1800);
  }

  return (
    <div className="rounded-3xl border border-orange-100 bg-white p-6 shadow-xl shadow-rose-950/10">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm font-semibold tracking-[0.28em] text-orange-700">WECHAT EXPORT</p>
          <h1 className="mt-2 text-3xl font-bold text-red-950">公众号排版导出</h1>
          <p className="mt-2 text-stone-600">复制下面的 HTML，到公众号编辑器中粘贴即可。</p>
        </div>
        <button onClick={copyHtml} className="rounded-full bg-red-800 px-5 py-3 font-semibold text-white transition hover:bg-red-900">
          {copied ? "已复制" : "复制排版"}
        </button>
      </div>
      <textarea className="mt-6 h-96 w-full rounded-2xl border border-orange-100 bg-orange-50/70 p-4 font-mono text-sm text-stone-800" value={html} readOnly />
    </div>
  );
}
