import { getCategories } from '@/resources/category/api'
import { TopMenuClient } from './top-menu-client'
import { getPromotion } from '@/resources/promotion/api'
import { getPromotionImages } from '@/resources/promotion-images/actions'

export const TopMenu = async () => {
	const categories = await getCategories()
	const promotion = await getPromotion()
	const promotionImages = await getPromotionImages()
	return <TopMenuClient categories={categories} promotion={promotion} promotionImages={promotionImages} />
}
