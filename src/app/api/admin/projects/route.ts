import { getAdminProjects, replaceAdminProjects } from "@/lib/admin/repositories";

export const runtime = "nodejs";

export async function GET() {
  return Response.json(getAdminProjects());
}

export async function POST(request: Request) {
  const body = (await request.json()) as { projects?: Parameters<typeof replaceAdminProjects>[0] };
  replaceAdminProjects(body.projects ?? []);
  return Response.json({ ok: true });
}
