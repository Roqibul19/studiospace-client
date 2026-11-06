import { NextResponse } from "next/server";
import { getSessionCookie } from "better-auth/cookies";

// A quick check that sends logged-out visitors to Login before the page loads.
// The Express API still verifies the JWT on every protected request.
export function proxy(request) {
  if (getSessionCookie(request)) return NextResponse.next();

  const { pathname, search } = request.nextUrl;
  const loginUrl = new URL("/login", request.url);
  loginUrl.searchParams.set("redirect", `${pathname}${search}`);
  return NextResponse.redirect(loginUrl);
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/add-studio",
    "/my-listings",
    "/my-bookings",
    "/studios/edit/:path*",
  ],
};
