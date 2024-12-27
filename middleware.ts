import { getToken } from "next-auth/jwt";
import { NextResponse, NextRequest } from "next/server";

export async function middleware(request: NextRequest) {

  const { pathname} = request.nextUrl

  if (pathname.startsWith("/api/auth/")) {
    return NextResponse.next(); 
  }

  const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
  });

  if (!token?.sub) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const responseHeaders = new Headers(request.headers);
  responseHeaders.set("x-loc-user", token.sub);

  return NextResponse.next({
    request: {
      headers: responseHeaders,
    },
  });
}

export const config = {
  matcher: ["/api/:path*"],
};
