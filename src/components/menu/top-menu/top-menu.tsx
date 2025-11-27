import { getCategories } from '@/resources/category/api'
import { TopMenuClient } from './top-menu-client'
import { getPromotion } from '@/resources/promotion/api'

export const TopMenu = async () => {
	const categories = await getCategories()
	const promotion = await getPromotion()
	return <TopMenuClient categories={categories} promotion={promotion} />
}
