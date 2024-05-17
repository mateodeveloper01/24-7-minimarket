// import { FaTrashAlt } from "react-icons/fa"

import { Product } from "../../types.d"
import Image from "next/image"
import { useCartStore } from "../../stores/useCartStore"

interface Props {
	product: Product
}

export default function CartItem({ product }: Props) {
	const {amount,brand,description,quantity,tipo,url}= product
	const removeFromCart = useCartStore(state => state.removeFromCart)
	return (
		<li className='flex justify-between items-center gap-4  mb-1 shadow-md '>
			<div className='flex items-center gap-3'>
				<Image
					src={url}
					alt={tipo}
					width={60}
					height={60}
					// className='h-10 w-10 rounded-full mr-4'
				/>
				<div className='flex flex-col'>
					<span className='font-bold flex-1'>{tipo} {description} {brand} {amount}</span>
					<span className='text-gray-400 font-bold'>${product.price}</span>
					<span>Cantidad: {quantity}</span>
				</div>
			</div>
			<div>
				<button
					title='Remove Item'
					className='text-red-500 hover:text-red-600 ml-4'
					onClick={() => removeFromCart(product)}
				>
                    borrar
					{/* <FaTrashAlt size={18} /> */}
				</button>
			</div>
		</li>
	)
}