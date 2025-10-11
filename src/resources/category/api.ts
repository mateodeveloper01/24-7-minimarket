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




export const createProductWithCategory = async (productName: string, categoryName: string) => {
  // Verificar si la categoría existe
  const existingCategory = await prisma.categoryModel.findFirst({
    where: { name: categoryName },
  })

  // Si no existe, crearla
//   if (!existingCategory) {
//     await createCategory(categoryName)
//   }

  // Aquí puedes agregar la lógica para crear el producto
  // Por ejemplo: await prisma.product.create({ data: { name: productName, category: categoryName } })

  console.log(`Producto "${productName}" creado con categoría "${categoryName}"`)
}