import { getCategories } from "@/resources/category/api"
import { CategoriesList } from "./CategoriesList"

export const CategoriesAdmin = async () => {
    const categories = await getCategories()

    return <CategoriesList categories={categories || []} />
}