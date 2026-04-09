import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const authCookie = request.cookies.get("session-token");

  const isAuthenticated = !!authCookie?.value;

  const isAuthPage =
    pathname.startsWith("/login") || pathname.startsWith("/register");
  const isDashboardPage = pathname.startsWith("/dashboard");


  if (isAuthenticated && isAuthPage) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  if (!isAuthenticated && isDashboardPage) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/login", "/register"],
};
