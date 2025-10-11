
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

import { auth0 } from "./lib/auth0";

export async function middleware(request: NextRequest) {
  const authResponse = await auth0.middleware(request);

  // Si Auth0 está redirigiendo después del callback, cambiar el destino a /gestor
  if (authResponse.status === 302 || authResponse.status === 307) {
    const location = authResponse.headers.get('location');
    
    // Si está redirigiendo a la raíz después del callback, cambiar a /gestor
    if (location === '/' || location === request.nextUrl.origin + '/') {
      // Crear la URL completa para el redirect
      const gestorUrl = new URL('/gestor', request.nextUrl.origin);
      const redirectResponse = NextResponse.redirect(gestorUrl);
      
      // Copiar TODOS los headers de Auth0, especialmente las cookies de sesión
      authResponse.headers.forEach((value, key) => {
        if (key.toLowerCase() !== 'location') {
          redirectResponse.headers.append(key, value);
        }
      });
      
      return redirectResponse;
    }
  }
 
  return authResponse;
}

export const config = {
  matcher: [
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