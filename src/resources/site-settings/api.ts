'use server'

import { revalidatePath } from 'next/cache'
import { connection } from 'next/server'
import { auth0 } from '@/lib/auth0'
import prisma from '@/utils/db'

const SETTINGS_ID = 'store'

export async function getMaintenanceMode(): Promise<boolean> {
  // Consultar por solicitud: no dejar la tienda abierta por una página estática.
  await connection()
  const settings = await prisma.siteSettings.findUnique({
    where: { id: SETTINGS_ID },
  })
  return settings?.maintenanceMode ?? false
}

export async function updateMaintenanceMode(enabled: boolean): Promise<boolean> {
  const session = await auth0.getSession()
  if (!session?.user) {
    throw new Error('No autorizado')
  }
  if (typeof enabled !== 'boolean') {
    throw new Error('Estado de mantenimiento inválido')
  }

  const settings = await prisma.siteSettings.upsert({
    where: { id: SETTINGS_ID },
    create: { id: SETTINGS_ID, maintenanceMode: enabled },
    update: { maintenanceMode: enabled },
  })
  revalidatePath('/', 'layout')
  return settings.maintenanceMode
}
