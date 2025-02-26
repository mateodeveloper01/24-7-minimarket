export interface Product {
	id: string
	tipo: string
	description: string
	price: number
	amount:string
	stock: boolean
	brand: string
	category: string
	url?: string | null
	quantity?: number
	image?: {
		url: string
		public_id: string
	} | null
}