import { NextRequest, NextResponse } from "next/server";

const COOKIE = "dash_token";
const LOGIN = "/dashboard/login";

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get(COOKIE)?.value;
  const isAuthenticated = !!token && token === process.env.DASHBOARD_TOKEN;

  // Allow login page always
  if (pathname === LOGIN) {
    if (isAuthenticated) {
      return NextResponse.redirect(new URL("/dashboard/projects", request.url));
    }
    const res = NextResponse.next();
    res.headers.set("x-pathname", pathname);
    return res;
  }

  // Protect all other /dashboard routes
  if (!isAuthenticated) {
    return NextResponse.redirect(new URL(LOGIN, request.url));
  }

  const response = NextResponse.next();
  response.headers.set("x-pathname", pathname);
  return response;
}

export const config = {
  matcher: ["/dashboard/:path*"],
};
