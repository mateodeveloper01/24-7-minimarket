export interface Product {
	id: string
	tipo: string
	description: string
	price: number
	amount:string
	stock?: number
	brand: string
	category: string
	url: string
	quantity?: number
}