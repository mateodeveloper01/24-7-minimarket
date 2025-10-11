import { ProductsGrid } from "@/components/products/ProductsGrid"

interface Prop {
	params: Promise<{
		category: string
	}>
}
export default async function CategoryPage({ params }: Prop) {
	const { category } = await params

	return (
		<>
			<div className="w-full bg-gray-100 flex justify-center items-center h-20 ">
				<h1 className="uppercase text-xl font-bold border-b-3 border-red-500 ">{category.replace(/_/g, ' ')}</h1>
			</div>
			{/* <div className="flex flex-col items-center justify-center w-full gap-10 pt-10 h-[60vh]">
			<div className="flex flex-col items-center justify-center gap-4 bg-white rounded-lg p-4">
				<h1 className="text-2xl font-bold">La tienda se encuentra en mantenimiento</h1>
			</div>
		</div> */}
			<ProductsGrid
				category={category}
				style={{ gridTemplateColumns: "var(--grid-template-columns-dynamic-200)" }}
				className="grid md:grid-cols-dynamic-200 gap-1 md:gap-4 "
			/>
		</>
	)
}
