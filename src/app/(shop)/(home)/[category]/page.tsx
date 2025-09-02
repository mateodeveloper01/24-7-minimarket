interface Prop {
	params: {
		category: string
	}
}
export default function CategoryPage({ params }: Prop) {
	return (
		<div className="flex flex-col items-center justify-center w-full gap-10 pt-10 h-[60vh]">
			<div className="flex flex-col items-center justify-center gap-4 bg-white rounded-lg p-4">
				<h1 className="text-2xl font-bold">La tienda se encuentra en mantenimiento</h1>
			</div>
		</div>
		// <ProductsGrid
		//   category={params.category}
		//   className="grid grid-cols-dynamic-150 md:grid-cols-dynamic-200 gap-1 md:gap-4 "
		// />
	)
}
