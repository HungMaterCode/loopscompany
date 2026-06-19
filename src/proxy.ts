import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";

const COOKIE_NAME = "loops_admin_session";
const secret = new TextEncoder().encode(
  process.env.AUTH_SECRET ?? "loops-dev-secret-change-in-production",
);

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname.startsWith("/admin") && !pathname.startsWith("/admin/dang-nhap")) {
    const token = request.cookies.get(COOKIE_NAME)?.value;
    if (!token) {
      return NextResponse.redirect(new URL("/admin/dang-nhap", request.url));
    }

    try {
      const { payload } = await jwtVerify(token, secret);
      const sessionPayload = payload as any;
      if (sessionPayload.role !== "admin" && sessionPayload.email !== "admin@loops.vn") {
        // Not an admin, redirect back to home page
        return NextResponse.redirect(new URL("/", request.url));
      }
      
      // Must use password login to access admin interface
      if (sessionPayload.authMethod !== "password") {
        return NextResponse.redirect(new URL("/admin/dang-nhap", request.url));
      }

      return NextResponse.next();
    } catch {
      return NextResponse.redirect(new URL("/admin/dang-nhap", request.url));
    }
  }

  if (pathname.startsWith("/admin/dang-nhap")) {
    const token = request.cookies.get(COOKIE_NAME)?.value;
    if (token) {
      try {
        const { payload } = await jwtVerify(token, secret);
        const sessionPayload = payload as any;
        if ((sessionPayload.role === "admin" || sessionPayload.email === "admin@loops.vn") && sessionPayload.authMethod === "password") {
          return NextResponse.redirect(new URL("/admin", request.url));
        }
      } catch {
        // invalid token — show login
      }
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
