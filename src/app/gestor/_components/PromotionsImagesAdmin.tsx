'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { useDropzone } from 'react-dropzone'
import { uploadPromotionImage, deletePromotionImage, getPromotionImages } from '@/resources/promotion-images/actions'
import { toast } from 'sonner'

interface PromotionImage {
    id: string
    public_id: string
    url: string
    index: number
}

export const PromotionsImagesAdmin = () => {
    const [images, setImages] = useState<PromotionImage[]>([])
    const [uploadingIndex, setUploadingIndex] = useState<number | null>(null)

    useEffect(() => {
        fetchImages()
    }, [])

    const fetchImages = async () => {
        try {
            const data = await getPromotionImages()
            console.log(data)
            setImages(data)
        } catch (error) {
            console.error('Error fetching images:', error)
            toast.error('Error al cargar las imágenes')
        }
    }

    const handleUpload = async (file: File, index: number) => {
        setUploadingIndex(index)
        const formData = new FormData()
        formData.append('image', file)
        formData.append('index', String(index))

        try {
            await uploadPromotionImage(formData)
            await fetchImages()
            toast.success('Imagen subida correctamente')
        } catch (error) {
            console.error('Error uploading image:', error)
            toast.error('Error al subir la imagen')
        } finally {
            setUploadingIndex(null)
        }
    }

    const handleDelete = async (id: string) => {
        try {
            await deletePromotionImage(id)
            await fetchImages()
            toast.success('Imagen eliminada correctamente')
        } catch (error) {
            console.error('Error deleting image:', error)
            toast.error('Error al eliminar la imagen')
        }
    }

    const ImageSlot = ({ index }: { index: number }) => {
        const image = images.find((img) => img.index === index)
        const { getRootProps, getInputProps, isDragActive } = useDropzone({
            onDrop: (files) => {
                if (files.length > 0) {
                    handleUpload(files[0], index)
                }
            },
            multiple: false,
            accept: { 'image/*': [] },
        })

        return (
            <div
                {...getRootProps()}
                className={`relative w-full h-[200px] border-2 rounded-lg overflow-hidden cursor-pointer transition ${isDragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:border-gray-400'
                    }`}
            >
                <input {...getInputProps()} />
                {image ? (
                    <>
                        <Image
                            src={image.url}
                            alt={`Promotion ${index}`}
                            fill
                            className="object-cover"
                        />
                        <div className="absolute inset-0 flex items-center justify-center">
                            <Button
                                variant="destructive"
                                size="sm"
                                onClick={(e) => {
                                    e.stopPropagation()
                                    handleDelete(image.id)
                                }}
                                className="opacity-0 hover:opacity-100 transition-opacity"
                            >
                                Eliminar
                            </Button>
                        </div>
                    </>
                ) : (
                    <div className="flex flex-col items-center justify-center h-full gap-2 text-gray-500">
                        {uploadingIndex === index ? (
                            <>
                                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
                                <p className="text-sm">Subiendo...</p>
                            </>
                        ) : (
                            <>
                                <p className="text-sm font-medium">Imagen {index + 1}</p>
                                <p className="text-xs">Arrastra o haz clic</p>
                            </>
                        )}
                    </div>
                )}
            </div>
        )
    }

    return (
        <div className="w-full max-w-6xl mx-auto p-6 bg-white rounded-lg shadow">
            <h2 className="text-2xl font-bold mb-6">Administrar Imágenes de Promoción</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {Array.from({ length: 9 }).map((_, index) => (
                    <ImageSlot key={index} index={index} />
                ))}
            </div>
        </div>
    )
}