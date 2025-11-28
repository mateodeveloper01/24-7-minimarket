'use client'
//TODO:CREAR UN SCRIPT PARA CAMBIAR DE product A Product
import { MyFormItem } from '@/components/order/MyFormItem'
import { ProductSchema } from '@/schemas/products'
import { Product } from '@/types'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { UploadImages } from './UploadImages'
import { useState } from 'react'
import { DevTool } from '@hookform/devtools'
import { createProduct, updateProduct } from '@/api'
import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form'
import { Switch } from '@/components/ui/switch'

interface Props {
	product?: Product
	pagination?: any[]
}
export type ProductSchemaType = z.infer<typeof ProductSchema>

export const ProductForm = ({ product, pagination = [] }: Props) => {
	const create = createProduct(pagination)
	const update = updateProduct(pagination)

	const [image, setImage] = useState<File | null>(null)

	const form = useForm<ProductSchemaType>({
		resolver: zodResolver(ProductSchema),
		defaultValues: {
			tipo: product ? product.tipo : '',
			amount: product ? product.amount : '',
			brand: product ? product.brand : '',
			category: product ? product.category : '',
			description: product ? product.description : '',
			price: product ? product.price.toString() : '',
			stock: product && product.stock
		}
	})
	const onSubmit = (values: ProductSchemaType) => {
		try {
			if (product) {
				update.mutate(image ? { ...values, id: product.id, image } : { ...values, id: product.id })
			} else {
				create.mutate(image ? { ...values, image } : { ...values })
			}
		} catch (error) {
			console.error('Error al guardar el producto:', error)
			alert('Hubo un error al guardar el producto. Inténtalo de nuevo.')
		}
	}
	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} onError={(error) => console.log(error)} className="space-y-4 ">
				<FormField control={form.control} name="tipo" render={({ field }) => <MyFormItem field={field} label="Tipo" />} />
				<FormField control={form.control} name="description" render={({ field }) => <MyFormItem field={field} label="Descripcion" />} />
				<FormField control={form.control} name="brand" render={({ field }) => <MyFormItem field={field} label="Marca" />} />
				<FormField control={form.control} name="amount" render={({ field }) => <MyFormItem field={field} label="Cantidad" />} />
				<FormField control={form.control} name="price" render={({ field }) => <MyFormItem field={field} label="Precio" type="number" />} />
				<FormField control={form.control} name="category" render={({ field }) => <MyFormItem field={field} label="Categoria" />} />
				<FormField
					control={form.control}
					name="stock"
					render={({ field }) => (
						<FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-xs">
							<FormLabel>Stock</FormLabel>
							<FormControl>
								<Switch checked={field.value} onCheckedChange={field.onChange} />
							</FormControl>
						</FormItem>
					)}
				/>
				<UploadImages onUpload={setImage} url={product?.url} />
				<DevTool control={form.control} />
				<div className="flex justify-end">
					<Button type="submit" className="w-1/3" disabled={create.isPending || update.isPending}>
						{create.isPending || update.isPending ? 'Guardando...' : 'Guardar'}
					</Button>
				</div>
			</form>
		</Form>
	)
}
