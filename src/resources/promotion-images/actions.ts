'use server'
import prisma from '@/utils/db'
import sharp from 'sharp'
import cloudinary from '@/utils/cloudinary'
import { revalidateTag } from 'next/cache'
import { cacheTag } from 'next/dist/server/use-cache/cache-tag'

const CACHE_TAG = 'promotion-images'

interface CloudinaryUploadResult {
  secure_url: string
  public_id: string
  [key: string]: any
}

export const uploadPromotionImage = async (formData: FormData) => {
  const imageFile = formData.get('image') as File
  const index = parseInt(formData.get('index') as string)

  if (!imageFile) {
    throw new Error('No image provided')
  }

  if (index < 0 || index > 8) {
    throw new Error('Index must be between 0 and 8')
  }

  try {
    // Process image in memory
    const imageBuffer = await imageFile.arrayBuffer()
    const imageWebp = await sharp(Buffer.from(imageBuffer)).webp().toBuffer()

    // Upload directly to Cloudinary
    const result = await new Promise<CloudinaryUploadResult>((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        { folder: 'promotion-images' },
        (error: any, result: any) => {
          if (error) reject(error)
          else resolve(result as CloudinaryUploadResult)
        }
      )
      uploadStream.end(imageWebp)
    })

    // Check if image already exists at this index
    const existingImage = await prisma.promotionImage.findUnique({
      where: { index },
    })

    let promotionImage
    if (existingImage) {
      // Delete old image from Cloudinary
      try {
        await cloudinary.uploader.destroy(existingImage.public_id)
      } catch (error) {
        console.error('Error deleting old image from Cloudinary:', error)
      }

      // Update existing image
      promotionImage = await prisma.promotionImage.update({
        where: { index },
        data: {
          public_id: result.public_id,
          url: result.secure_url,
        },
      })
    } else {
      // Create new image
      promotionImage = await prisma.promotionImage.create({
        data: {
          index,
          public_id: result.public_id,
          url: result.secure_url,
        },
      })
    }

    revalidateTag(CACHE_TAG)
    return promotionImage
  } catch (error) {
    console.error('Error uploading promotion image:', error)
    throw error
  }
}

export const deletePromotionImage = async (id: string) => {
  try {
    const image = await prisma.promotionImage.findUnique({
      where: { id },
    })

    if (!image) {
      throw new Error('Image not found')
    }

    // Delete from Cloudinary
    try {
      await cloudinary.uploader.destroy(image.public_id)
    } catch (error) {
      console.error('Error deleting image from Cloudinary:', error)
    }

    // Delete from database
    await prisma.promotionImage.delete({
      where: { id },
    })

    revalidateTag(CACHE_TAG)
    return { success: true }
  } catch (error) {
    console.error('Error deleting promotion image:', error)
    throw error
  }
}

export const getPromotionImages = async () => {
  'use cache'
  cacheTag(CACHE_TAG)
  try {
    const images = await prisma.promotionImage.findMany({
      orderBy: { index: 'asc' },
    })
    return images
  } catch (error) {
    console.error('Error fetching promotion images:', error)
    return []
  }
}

export const getPromotionImageByIndex = async (index: number) => {
  'use cache'
  cacheTag(CACHE_TAG)
  try {
    const image = await prisma.promotionImage.findUnique({
      where: { index },
    })
    return image
  } catch (error) {
    console.error('Error fetching promotion image:', error)
    return null
  }
}
