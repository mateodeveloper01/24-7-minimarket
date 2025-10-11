
import { ProductsCarrousel } from "@/components/products/ProductsCarrousel"
import { getCategories } from "@/resources/category/api"

export default async function HomePage() {
	const categories = await getCategories()
	return (
		<div className="flex flex-col items-center justify-center w-full gap-10 pt-10">
			{categories.map((category: string) => (
				<ProductsCarrousel key={category} category={category} />
			))}
		</div>
	)
}
