'use server'

import prisma  from "@/utils/db"
import {
    unstable_expireTag as expireTag,
    unstable_cacheLife as cacheLife,
    unstable_cacheTag as cacheTag
} from 'next/cache'

const CACHE_TAG = 'categories'

export const getCategories = async (): Promise<string[]> => {
    "use cache"
    cacheTag(`${CACHE_TAG}-get`)
    cacheLife("max")
  
    const categories = await prisma.categoryModel.findMany()
    return categories.map((category) => category.name)
  }


