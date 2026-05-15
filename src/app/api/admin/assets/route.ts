import fs from "node:fs/promises";
import path from "node:path";
import { NextResponse } from "next/server";
import { getAdminAssets, saveAdminAsset } from "@/lib/admin/repositories";

export const runtime = "nodejs";

function getUploadTarget(fileName: string) {
  const date = new Date();
  const year = String(date.getFullYear());
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const safeName = fileName.replace(/[^a-zA-Z0-9._-]/g, "-");
  const uniqueName = `${Date.now()}-${safeName}`;
  const relativeDirectory = `/uploads/${year}/${month}`;
  const absoluteDirectory = path.join(process.cwd(), "public", "uploads", year, month);

  return {
    absoluteDirectory,
    absolutePath: path.join(absoluteDirectory, uniqueName),
    publicPath: `${relativeDirectory}/${uniqueName}`,
  };
}

export function GET() {
  return NextResponse.json(getAdminAssets());
}

export async function POST(request: Request) {
  const formData = await request.formData();
  const file = formData.get("file");

  if (!(file instanceof File)) {
    return NextResponse.json({ error: "缺少上传文件" }, { status: 400 });
  }

  const target = getUploadTarget(file.name);
  await fs.mkdir(target.absoluteDirectory, { recursive: true });
  await fs.writeFile(target.absolutePath, Buffer.from(await file.arrayBuffer()));

  const id = saveAdminAsset({
    fileName: file.name,
    publicPath: target.publicPath,
    mimeType: file.type || "application/octet-stream",
    size: file.size,
  });

  return NextResponse.json({ ok: true, id, publicPath: target.publicPath });
}
