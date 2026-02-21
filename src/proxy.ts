import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { authClient } from "./lib/auth-client";
import { headers } from "next/headers";

export async function proxy(request: NextRequest) {
  const sessionToken = request.cookies.get("__Secure-better-auth.session_token");
  // const { data } = await authClient.getSession({
  //     fetchOptions: { headers: await headers() }
  // });

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