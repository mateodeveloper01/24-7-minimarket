'use client'

import { getPromotion, updatePromotion } from "@/resources/promotion/api"
import { useEffect, useState } from "react"
import { toast } from "sonner"

export const PromotionForm = () => {
    const [promotion, setPromotion] = useState('')

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const formData = new FormData(e.currentTarget)
        const promotion = formData.get('promotion')
        try {
            await updatePromotion(promotion as string)

            toast.success('Promocion actualizada')
        } catch (error) {
            toast.error('Error al actualizar la promocion')
            console.error(error)
        }
    }

    useEffect(() => {
        const getPromotionHandler = async () => {
            const promotion = await getPromotion()
            setPromotion(promotion)
        }
        getPromotionHandler()
    }, [])
    return (
        <div className="w-full max-w-4xl mx-auto mb-8">
            <form onSubmit={handleSubmit} className="bg-white border border-gray-200 rounded-lg shadow-sm p-6">
                <div className="flex flex-col gap-4">
                    <div className="flex flex-col gap-2">
                        <label htmlFor="promotion" className=" font-semibold text-gray-700">
                            Promoción
                        </label>
                        <input
                            type="text"
                            name="promotion"
                            id="promotion"
                            defaultValue={promotion}
                            placeholder="Ej: Pedidos mayores a $50000 envío gratis"
                            className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                    </div>
                    <button
                        type="submit"
                        className=" bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-md transition-colors duration-200 self-end"
                    >
                        Guardar
                    </button>
                </div>
            </form>
        </div>
    )
}