import { NextResponse } from "next/server";
import { OAuth2Client } from "google-auth-library";
import { prisma } from "@/lib/prisma";
import { createSession } from "@/lib/auth";

const client = new OAuth2Client(process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID);

export async function POST(request: Request) {
  try {
    const { token } = await request.json();

    if (!token) {
      return NextResponse.json({ error: "No token provided" }, { status: 400 });
    }

    // Verify Google ID token
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
    });
    
    const payload = ticket.getPayload();
    if (!payload || !payload.email) {
      return NextResponse.json({ error: "Invalid Google token" }, { status: 401 });
    }

    const { email, name, picture } = payload;

    // Check if user exists in our database, if not create them (auto-registration via Google)
    let user = await prisma.user.findUnique({
      where: { email: email.trim().toLowerCase() },
    });

    if (!user) {
      user = await prisma.user.create({
        data: {
          email: email.trim().toLowerCase(),
          name: name || "User",
          avatar: picture || null,
          googleId: payload.sub,
          role: "user",
        }
      });
    } else {
      // User requested not to update existing user's info (name/avatar) with Google's info.
      // Only add googleId if it's missing, otherwise do not update name/avatar.
      if (!user.googleId) {
        user = await prisma.user.update({
          where: { id: user.id },
          data: {
            googleId: payload.sub,
          }
        });
      }
    }

    // Create our app session
    await createSession({
      userId: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
      authMethod: "google",
    });

    return NextResponse.json({ ok: true, name: user.name });

  } catch (error) {
    console.error("Google Auth Error:", error);
    return NextResponse.json({ error: "Lỗi đăng nhập Google" }, { status: 500 });
  }
}
