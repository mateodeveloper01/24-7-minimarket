'use server'
import prisma  from "@/utils/db"
import { revalidateTag } from "next/cache"
import { cacheLife } from "next/dist/server/use-cache/cache-life"
import { cacheTag } from "next/dist/server/use-cache/cache-tag"

const CACHE_TAG = 'promotion'

export const getPromotion = async (): Promise<string> => {
    "use cache"
    cacheTag(`${CACHE_TAG}-get`)
    cacheLife("max")
  
    const promotion = await prisma.promotion.findFirst()
    return promotion?.name || ''
  }

export const updatePromotion = async (promotion: string) => {
    await prisma.promotion.update({
        where: { id: '6928cdea25005dedb65df827' },
        data: { name: promotion }
    })
    revalidateTag(`${CACHE_TAG}-get`)
}
