import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
  const body = await request.json();
  const { name, email, phone, message, source = "website", details } = body;

  if (!name || !email || !message) {
    return NextResponse.json({ error: "Thiếu thông tin bắt buộc" }, { status: 400 });
  }

  try {
    await prisma.contactLead.create({
      data: { name, email, phone, message, source, details },
    });
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: true, stored: false });
  }
}
