
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

import { auth0 } from "./lib/auth0";

export async function middleware(request: NextRequest) {
  const authResponse = await auth0.middleware(request);

  const session = await auth0.getSession(request);
  if (
    !session &&
    !request.nextUrl.pathname.startsWith("/auth/login") &&
    !request.nextUrl.pathname.startsWith("/login")
  ) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return authResponse;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico, sitemap.xml, robots.txt (metadata files)
     */
    "/((?!_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)",
  ],
};


// import { auth } from "@/auth";


// export default auth((req) => {
//   const { nextUrl } = req;
//   const isAuthenticated = !!req.auth;
//   if (!isAuthenticated && isPrivateRoute)
//     return Response.redirect(new URL("/", nextUrl));
// });

// export const config = {
//   matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
// };