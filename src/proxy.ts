import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function proxy(request: NextRequest) {
  const sessionToken = request.cookies.get("better-auth.session_token");

  const isLoginPage = request.nextUrl.pathname.startsWith("/login");
  
  if (!sessionToken && !isLoginPage) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (sessionToken && isLoginPage) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};