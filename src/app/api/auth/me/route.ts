import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ user: null });
  }

  // Fetch full user details from DB to get avatar if needed,
  // or just use session if avatar is stored in session.
  // Wait, session only has userId, email, name.
  if (session.userId === "dev-admin") {
    return NextResponse.json({
      user: {
        id: session.userId,
        name: session.name,
        email: session.email,
        avatar: null,
      }
    });
  }

  try {
    const user = await prisma.user.findUnique({
      where: { id: session.userId },
      select: { id: true, name: true, email: true, avatar: true },
    });

    return NextResponse.json({ user });
  } catch (err) {
    return NextResponse.json({ user: null });
  }
}
