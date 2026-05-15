import { NextResponse } from "next/server";
import { getAdminLinks, replaceAdminLinks, type AdminLink } from "@/lib/admin/repositories";

export const runtime = "nodejs";

export function GET() {
  return NextResponse.json(getAdminLinks());
}

export async function POST(request: Request) {
  const body = (await request.json()) as { links?: Omit<AdminLink, "id">[] };

  replaceAdminLinks(
    (body.links ?? []).map((link, index) => ({
      label: link.label ?? "",
      value: link.value ?? "",
      href: link.href ?? "#",
      sortOrder: index,
    })),
  );

  return NextResponse.json({ ok: true });
}
