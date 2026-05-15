import { NextResponse } from "next/server";
import { getAdminPosts, saveAdminPost, type AdminPost } from "@/lib/admin/repositories";

export const runtime = "nodejs";

export function GET() {
  return NextResponse.json(getAdminPosts());
}

export async function POST(request: Request) {
  const body = (await request.json()) as Partial<AdminPost>;

  const id = saveAdminPost({
    id: body.id,
    title: body.title ?? "未命名文案",
    summary: body.summary ?? "",
    category: body.category ?? "个人思考",
    content: body.content ?? "",
    cover: body.cover || "/post-cover-placeholder.svg",
    status: body.status ?? "draft",
  });

  return NextResponse.json({ ok: true, id });
}
