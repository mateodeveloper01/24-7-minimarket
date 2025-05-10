import { AboutMe, ProductsCarrousel } from '@/components'
import { categories } from '@/schemas'
import { Category } from '@prisma/client'

export default async function HomePage() {
	return (
		<div className="flex flex-col items-center justify-center w-full gap-10 pt-10">
			<div className="flex flex-col items-center justify-center w-full gap-10 pt-10 h-[60vh]">
				<div className="flex flex-col items-center justify-center gap-4 bg-white rounded-lg p-4">
					<h1 className="text-2xl font-bold">La tienda se encuentra en mantenimiento</h1>
				</div>
			</div>
			{/* {categories.map((category: string) => (
        <ProductsCarrousel key={category} category={category as Category} />
      ))} */}
		</div>
	)
}
