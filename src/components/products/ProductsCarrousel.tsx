import { ProductItem } from './ProductItem'
import { Title } from '../ui/Title'
import Link from 'next/link'
import { Button } from '../ui/button'
import { Carousel, CarouselContent, CarouselItem } from '../ui/carousel'
import { getProducts } from '@/api'

interface Prop {
	category: string
	limit?: number
	className?: string
}
export const ProductsCarrousel = async ({ category }: Prop) => {
	const { data } = await getProducts({ category: category })

	return data.length !== 0 ? (
		<div className="w-4/5 flex flex-col gap-5">
			<div className="border-t-2 border-black pt-4  flex justify-between ">
				<Title>Productos {category.replace(/_/g, ' ')}</Title>
				<Link href={`/${category}`}>
					<Button>Ver todo</Button>
				</Link>
			</div>
			<Carousel className="w-full ">
				<CarouselContent className="-ml-1">
					{data.map((product) => (
						<CarouselItem key={product.id} className="pl-1 basis-4/7 ">
							<ProductItem {...product} />
						</CarouselItem>
					))}
				</CarouselContent>
			</Carousel>
		</div>
	) : (
		<></>
	)
}
