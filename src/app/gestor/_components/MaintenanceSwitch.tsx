'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import { Switch } from '@/components/ui/switch'
import { updateMaintenanceMode } from '@/resources/site-settings/api'

export function MaintenanceSwitch({ initialEnabled }: { initialEnabled: boolean }) {
  const [enabled, setEnabled] = useState(initialEnabled)
  const [saving, setSaving] = useState(false)
  const router = useRouter()

  useEffect(() => {
    setEnabled(initialEnabled)
  }, [initialEnabled])

  const handleChange = async (checked: boolean) => {
    if (saving) return
    setSaving(true)
    try {
      const saved = await updateMaintenanceMode(checked)
      setEnabled(saved)
      toast.success(saved ? 'Mantenimiento activado' : 'La tienda está disponible nuevamente')
      router.refresh()
    } catch {
      toast.error('No se pudo cambiar el mantenimiento. Intentá nuevamente.')
    } finally {
      setSaving(false)
    }
  }

  return (
    <section className="mb-4 flex items-center justify-between gap-4 rounded-lg border bg-white p-4">
      <div>
        <label htmlFor="maintenance-mode" className="font-semibold text-gray-700">
          Modo mantenimiento
        </label>
        <p id="maintenance-description" className="mt-1 text-sm text-gray-500">
          Oculta la tienda a los visitantes. El administrador sigue disponible.
        </p>
        <p className="mt-2 text-sm font-medium" role="status">
          {saving ? 'Guardando…' : enabled ? 'La tienda está en mantenimiento' : 'La tienda está abierta'}
        </p>
      </div>
      <Switch
        id="maintenance-mode"
        aria-describedby="maintenance-description"
        checked={enabled}
        disabled={saving}
        onCheckedChange={handleChange}
      />
    </section>
  )
}
