import { NextRequest } from 'next/server';

export async function GET(request: NextRequest) {
  // Auth0 maneja el logout a través del middleware
  // Solo necesitamos esta ruta para que exista
  return new Response(null, {
    status: 302,
    headers: {
      Location: '/'
    }
  });
}
