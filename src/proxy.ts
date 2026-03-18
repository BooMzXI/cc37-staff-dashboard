import { headers } from "next/headers";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { authClient } from "./lib/auth-client";

export async function proxy(request: NextRequest) {
	// let sessionToken = request.cookies.get("better-auth.session_token");
	// if (appConfig.isProd) {
	// 	sessionToken = request.cookies.get("__Secure-better-auth.session_token");
	// }

	const { data: sessionToken } = await authClient.getSession({
		fetchOptions: { headers: await headers() },
	});

	const isLoginPage = request.nextUrl.pathname.startsWith("/login");
	const redirectTarget = `${request.nextUrl.pathname}${request.nextUrl.search}`;

	const getLoginUrlWithRedirect = () => {
		const loginUrl = new URL("/login", request.url);
		loginUrl.searchParams.set("redirect", redirectTarget);
		return loginUrl;
	};

	if (sessionToken?.user.role === "user") {
		if (isLoginPage) {
			const response = NextResponse.next();
			response.cookies.delete("better-auth.session_token");
			response.cookies.delete("__Secure-better-auth.session_token");
			return response;
		}

		const response = NextResponse.redirect(getLoginUrlWithRedirect());
		response.cookies.delete("better-auth.session_token");
		response.cookies.delete("__Secure-better-auth.session_token");
		return response;
	}

	if (!sessionToken && !isLoginPage) {
		return NextResponse.redirect(getLoginUrlWithRedirect());
	}

	if (sessionToken && isLoginPage) {
		const redirect = request.nextUrl.searchParams.get("redirect");
		const safeRedirectPath = redirect?.startsWith("/") && !redirect?.startsWith("//") ? (redirect ?? "/") : "/";

		return NextResponse.redirect(new URL(safeRedirectPath, request.url));
	}

	return NextResponse.next();
}

export const config = {
	matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
