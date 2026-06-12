import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { createSession } from "@/lib/auth";

export async function POST(request: Request) {
  try {
    const { credential } = await request.json();

    if (!credential) {
      return NextResponse.json({ error: "Missing credential token" }, { status: 400 });
    }

    // Verify token using Google's tokeninfo endpoint
    const verifyRes = await fetch(
      `https://oauth2.googleapis.com/tokeninfo?id_token=${credential}`
    );

    if (!verifyRes.ok) {
      return NextResponse.json({ error: "Invalid Google token" }, { status: 400 });
    }

    const payload = await verifyRes.json();
    const { email, name, sub, email_verified, picture } = payload;

    if (!email_verified || !email) {
      return NextResponse.json({ error: "Google account not verified or email missing" }, { status: 400 });
    }

    // Look up user or create one
    let user;
    try {
      user = await prisma.user.findUnique({
        where: { email: email.trim().toLowerCase() },
      });

      if (user) {
        // Update user if they don't have googleId or avatar
        const updateData: { googleId?: string; avatar?: string } = {};
        if (!user.googleId) updateData.googleId = sub;
        if (!user.avatar && picture) updateData.avatar = picture;
        
        if (Object.keys(updateData).length > 0) {
          user = await prisma.user.update({
            where: { id: user.id },
            data: updateData,
          });
        }
      } else {
        // Create new user with googleId and avatar
        user = await prisma.user.create({
          data: {
            email: email.trim().toLowerCase(),
            name: name || "Google User",
            googleId: sub,
            avatar: picture || null,
            role: "user",
          },
        });
      }
    } catch (dbError) {
      console.error("Database error during Google auth:", dbError);
      // Fallback for development if DB is unavailable
      if (process.env.NODE_ENV !== "production") {
        await createSession({
          userId: `google-${sub}`,
          email: email.trim().toLowerCase(),
          name: name || "Google User",
          avatar: picture || null,
        });
        return NextResponse.json({ ok: true, name: name || "Google User", devFallback: true });
      }
      return NextResponse.json({ error: "Database unavailable" }, { status: 503 });
    }

    // Create session
    await createSession({
      userId: user.id,
      email: user.email,
      name: user.name,
      avatar: user.avatar,
    });

    return NextResponse.json({ ok: true, name: user.name });
  } catch (error) {
    console.error("Google login error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
