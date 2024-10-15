import { auth } from "@/auth";

// export const config = { matcher: ["/dashboard"] };
// import NextAuth from 'next-auth';
// import { authConfig } from '@/auth.config';
// import { DEFAULT_REDIRECT, PUBLIC_ROUTES, ROOT } from '@/lib/routes';

// const { auth } = NextAuth(authConfig);

// const { auth } = NextAuth(authConfig);

export default auth((req) => {
  const { nextUrl } = req;
  const isAuthenticated = !!req.auth;
  const isPrivateRoute = ["/dashboard"].includes(nextUrl.pathname);

  //    if (isPublicRoute && isAuthenticated)
  //     return Response.redirect(new URL('/dashboard', nextUrl));

  if (!isAuthenticated && isPrivateRoute)
    return Response.redirect(new URL("/", nextUrl));
});

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
