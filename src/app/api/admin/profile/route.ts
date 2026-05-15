import { NextResponse } from "next/server";
import { getAdminProfile, saveAdminProfile, type AdminProfile } from "@/lib/admin/repositories";

export const runtime = "nodejs";

export function GET() {
  return NextResponse.json(getAdminProfile());
}

export async function POST(request: Request) {
  const body = (await request.json()) as AdminProfile;

  saveAdminProfile({
    name: body.name ?? "",
    alias: body.alias ?? "",
    headline: body.headline ?? "",
    description: body.description ?? "",
    avatar: body.avatar || "/profile/avatar.webp",
    cta: body.cta ?? "",
  });

  return NextResponse.json({ ok: true });
}
