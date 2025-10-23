"use client"

import { deleteCategory } from "@/resources/category/api"
import { useRouter } from "next/navigation"
import { useState } from "react"

interface CategoriesListProps {
    categories: string[]
}

export const CategoriesList = ({ categories }: CategoriesListProps) => {
    const router = useRouter()
    const [error, setError] = useState<string | null>(null)
    const [loading, setLoading] = useState<string | null>(null)

    const handleDeleteCategory = async (category: string) => {
        if (!confirm(`¿Estás seguro de eliminar la categoría "${category}"? Los productos asociados serán desactivados.`)) {
            return
        }

        setError(null)
        setLoading(category)

        try {
            await deleteCategory(category)
            router.refresh()
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to delete category')
        } finally {
            setLoading(null)
        }
    }

    return (
        <div className="container w-full  py-4">
            <div className="bg-white rounded border border-gray-200">
                <div className="px-4 py-3 border-b border-gray-200 flex items-center justify-between">
                    <h2 className="text-lg font-semibold text-gray-800">Categorías</h2>
                    <span className="text-xs text-gray-500">{categories.length} total</span>
                </div>

                <div className="p-4">
                    {error && (
                        <div className="mb-3 bg-red-50 border border-red-200 text-red-800 px-3 py-2 rounded text-sm flex items-start">
                            <svg className="w-4 h-4 mr-2 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                            </svg>
                            {error}
                        </div>
                    )}

                    {categories.length === 0 ? (
                        <div className="text-center py-8 text-gray-500 text-sm">
                            No hay categorías disponibles
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-3">
                            {categories.map((category) => (
                                <div
                                    key={category}
                                    className="flex flex-col p-3 bg-gray-50 hover:bg-gray-100 rounded border border-gray-200 transition-colors"
                                >
                                    <span className="text-gray-800 text-sm font-medium mb-2 truncate" title={category}>
                                        {category}
                                    </span>

                                    <button
                                        onClick={() => handleDeleteCategory(category)}
                                        disabled={loading === category}
                                        className="w-full px-3 py-1.5 text-xs font-medium text-red-700 bg-white hover:bg-red-50 border border-red-200 rounded transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                                    >
                                        {loading === category ? (
                                            <>
                                                <svg className="animate-spin mr-1.5 h-3 w-3" fill="none" viewBox="0 0 24 24">
                                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                                </svg>
                                                Eliminando...
                                            </>
                                        ) : (
                                            <>
                                                <svg className="w-3.5 h-3.5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                </svg>
                                                Eliminar
                                            </>
                                        )}
                                    </button>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}
