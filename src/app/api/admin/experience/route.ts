import { getAdminExperiences, replaceAdminExperiences } from "@/lib/admin/repositories";

export const runtime = "nodejs";

export async function GET() {
  return Response.json(getAdminExperiences());
}

export async function POST(request: Request) {
  const body = (await request.json()) as { experiences?: Parameters<typeof replaceAdminExperiences>[0] };
  replaceAdminExperiences(body.experiences ?? []);
  return Response.json({ ok: true });
}
