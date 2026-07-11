import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { createSession, verifyPassword } from "@/lib/auth";
import { checkRateLimit, getClientIp } from "@/lib/rate-limit";

export async function POST(request: Request) {
  // Rate limiting: max 5 login attempts per minute per IP
  const ip = getClientIp(request);
  const { allowed, remaining } = checkRateLimit(`login:${ip}`, {
    maxRequests: 5,
    windowMs: 60 * 1000,
  });
  if (!allowed) {
    return NextResponse.json(
      { error: "Quá nhiều lần thử. Vui lòng đợi 1 phút." },
      { status: 429 }
    );
  }

  const { email, password } = await request.json();

  if (!email || !password) {
    return NextResponse.json({ error: "Missing credentials" }, { status: 400 });
  }

  try {
    const user = await prisma.user.findUnique({
      where: { email: email.trim().toLowerCase() },
    });

    if (!user || !user.password || !(await verifyPassword(password, user.password))) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
    }

    await createSession({
      userId: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
      authMethod: "password",
    });

    return NextResponse.json({ ok: true, name: user.name });
  } catch {
    return NextResponse.json({ error: "Hệ thống đang bảo trì, vui lòng thử lại sau" }, { status: 503 });
  }
}
