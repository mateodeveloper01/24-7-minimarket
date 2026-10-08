import Link from 'next/link'
import { Wrench } from 'lucide-react'

export function MaintenanceScreen() {
  return (
    <section className="flex min-h-[75vh] w-full flex-col items-center justify-center gap-4 px-6 text-center">
      <Wrench className="h-12 w-12 text-primary" aria-hidden="true" />
      <h1 className="text-3xl font-bold">Estamos en mantenimiento</h1>
      <p className="max-w-md text-gray-600">
        Estamos mejorando nuestra tienda. Volvé a visitarnos en un rato.
        ¡Gracias por tu paciencia!
      </p>
      <Link href="/gestor" className="mt-6 text-sm text-gray-500 underline">
        Acceso al administrador
      </Link>
    </section>
  )
}
