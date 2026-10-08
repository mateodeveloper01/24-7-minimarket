'use server'
import prisma  from "@/utils/db"
import { unstable_cache, updateTag } from "next/cache"

const CACHE_TAG = 'promotion'

const getCachedPromotion = unstable_cache(async (): Promise<string> => {
    const promotion = await prisma.promotion.findFirst()
    return promotion?.name || ''
  }, [CACHE_TAG], { tags: [`${CACHE_TAG}-get`] })

export const getPromotion = async (): Promise<string> => getCachedPromotion()

export const updatePromotion = async (promotion: string) => {
    await prisma.promotion.update({
        where: { id: '6928cdea25005dedb65df827' },
        data: { name: promotion }
    })
    updateTag(`${CACHE_TAG}-get`)
}
