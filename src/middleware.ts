import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";

const COOKIE_NAME = "loops_admin_session";
const secret = new TextEncoder().encode(
  process.env.AUTH_SECRET ?? "loops-dev-secret-change-in-production",
);

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname.startsWith("/admin") && !pathname.startsWith("/admin/dang-nhap")) {
    const token = request.cookies.get(COOKIE_NAME)?.value;
    if (!token) {
      return NextResponse.redirect(new URL("/admin/dang-nhap", request.url));
    }

    try {
      await jwtVerify(token, secret);
      return NextResponse.next();
    } catch {
      return NextResponse.redirect(new URL("/admin/dang-nhap", request.url));
    }
  }

  if (pathname.startsWith("/admin/dang-nhap")) {
    const token = request.cookies.get(COOKIE_NAME)?.value;
    if (token) {
      try {
        await jwtVerify(token, secret);
        return NextResponse.redirect(new URL("/admin", request.url));
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
