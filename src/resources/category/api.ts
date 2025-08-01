'use server'

import prisma  from "@/utils/db"


export const getCategories = async (): Promise<string[]> => {
	const categories = await prisma.categoryModel.findMany()
	return categories.map((category) => category.name)
}



