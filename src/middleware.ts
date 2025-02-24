import { auth } from "@/auth";


export default auth((req) => {
  const { nextUrl } = req;
  const isAuthenticated = !!req.auth;
  const isPrivateRoute = ["/dashboard"].includes(nextUrl.pathname);

  if (!isAuthenticated && isPrivateRoute)
    return Response.redirect(new URL("/", nextUrl));
});

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
