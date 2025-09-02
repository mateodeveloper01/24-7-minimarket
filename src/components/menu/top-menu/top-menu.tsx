import { getCategories } from '@/resources/category/api'
import { TopMenuClient } from './top-menu-client'

export const TopMenu = async () => {
	const categories = await getCategories()

	return <TopMenuClient categories={categories} />
}
