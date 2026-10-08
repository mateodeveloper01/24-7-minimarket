'use server'

import prisma  from "@/utils/db"
import {
    unstable_cache,
    updateTag
} from 'next/cache'

const CACHE_TAG = 'categories'

const getCachedCategories = unstable_cache(async (): Promise<string[]> => {
    const categories = await prisma.categoryModel.findMany()
    return categories.map((category) => category.name)
  }, [CACHE_TAG], { tags: [`${CACHE_TAG}-get`] })

export const getCategories = async (): Promise<string[]> => getCachedCategories()

export const deleteCategory = async (categoryName: string) => {
    // Check if category exists
    const category = await prisma.categoryModel.findFirst({
      where: { name: categoryName },
      include: { products: true }
    })
  
    if (!category) {
      throw new Error('Category not found')
    }
  
    // Update associated products: disconnect category and deactivate them
    if (category.products.length > 0) {
      // Use raw MongoDB update to set categoryModelId to null
      await prisma.$runCommandRaw({
        update: 'products',
        updates: [
          {
            q: { categoryModelId: { $oid: category.id } },
            u: { 
              $set: { 
                categoryModelId: null,
                stock: false 
              } 
            },
            multi: true
          }
        ]
      })
    }
  
    // Delete the category
    await prisma.categoryModel.delete({
      where: { name: categoryName },
    })
  
    updateTag(`${CACHE_TAG}-get`)
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
