'use client'
import { Cart } from '@/components/cart/Cart'
import { OrderForm } from '@/components/order/OrderForm'
import useFromStore from '@/hooks/useFromStore'
import { useCartStore } from '@/stores/useCartStore'

export default function pedido() {
	const totalPrice = useFromStore(useCartStore, (state) => state.totalPrice)
	return (
		<div className="flex flex-col gap-4 md:w-4/5 max-w-[800px] ">
			{!totalPrice ? (
				<section className="mt-5 text-center h-[30vh] flex flex-col justify-center bg-gray-50">
					<h2 className="text-2xl font-semibold text-gray-700 sm:text-3xl">Agrega productos al carrito para realizar tu compra</h2>
				</section>
			) : (
				<>
					<Cart />
					<OrderForm />
				</>
			)}
		</div>
	)
}
{
	/* <h2>Agrega productos al carrito para realizar tu compra</h2>; */
}
