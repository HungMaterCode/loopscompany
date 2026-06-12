import { NextResponse } from "next/server";
import { getSiteConfig, saveSiteConfigToDb } from "@/lib/site-config-server";
import type { SiteConfig } from "@/features/legacy-core/site-config-api";
import { getSession } from "@/lib/auth";

export async function GET() {
  const config = await getSiteConfig();
  return NextResponse.json(config);
}

export async function PUT(request: Request) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const config = (await request.json()) as SiteConfig;
  await saveSiteConfigToDb(config);
  return NextResponse.json({ ok: true });
}
