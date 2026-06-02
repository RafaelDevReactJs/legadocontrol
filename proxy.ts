import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { AUTH_FLAG_COOKIE } from "@/lib/auth/session";

export function proxy(request: NextRequest) {
  const isAuthenticated =
    request.cookies.get(AUTH_FLAG_COOKIE)?.value === "1";

  if (request.nextUrl.pathname.startsWith("/painel") && !isAuthenticated) {
    return NextResponse.redirect(new URL("/login/admin", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/painel/:path*"],
};
