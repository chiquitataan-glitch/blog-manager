import { execFile } from "node:child_process";
import fs from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { promisify } from "node:util";
import { NextResponse } from "next/server";

const execFileAsync = promisify(execFile);

export const runtime = "nodejs";

export async function POST(request: Request) {
  const body = (await request.json()) as { title?: string; content?: string };
  const title = body.title?.trim() || "公众号文档";
  const content = body.content?.trim() || "";

  if (!content) {
    return NextResponse.json({ error: "请先填写文案内容" }, { status: 400 });
  }

  const workspace = await fs.mkdtemp(path.join(os.tmpdir(), "99blog-wechat-"));
  const inputPath = path.join(workspace, "input.md");
  const outputPath = path.join(workspace, "output.html");

  await fs.writeFile(inputPath, `# ${title}\n\n${content}`, "utf8");

  try {
    await execFileAsync("md2wechat", ["convert", inputPath, "-o", outputPath], { timeout: 120000 });
    const html = await fs.readFile(outputPath, "utf8");
    return NextResponse.json({ ok: true, html });
  } catch (error) {
    const message = error instanceof Error ? error.message : "md2wechat 执行失败";
    return NextResponse.json({ error: message }, { status: 500 });
  } finally {
    await fs.rm(workspace, { recursive: true, force: true });
  }
}
