import { NextRequest, NextResponse } from "next/server";

const COOKIE = "dash_token";
const LOGIN = "/dashboard/login";

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get(COOKIE)?.value;
  const isAuthenticated = !!token && token === process.env.DASHBOARD_TOKEN;

  // Allow login page always
  if (pathname === LOGIN) {
    // If already authenticated, skip the login page
    if (isAuthenticated) {
      return NextResponse.redirect(new URL("/dashboard/projects", request.url));
    }
    return NextResponse.next();
  }

  // Protect all other /dashboard routes
  if (!isAuthenticated) {
    return NextResponse.redirect(new URL(LOGIN, request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*"],
};
