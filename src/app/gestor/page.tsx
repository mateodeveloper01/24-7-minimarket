
import { DataTable } from './_components/table/data-table'
import { columns } from './_components/table/columns'
import { auth0 } from '@/lib/auth0';
import LoginPage from '../(shop)/(home)/admin/page';
import { CategoriesAdmin } from './_components/CategoriesAdmin';
import { PromotionForm } from './_components/PromotionForm';
import { PromotionsImagesAdmin } from './_components/PromotionsImagesAdmin';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
export default async function Dashboard() {
	const session = await auth0.getSession();
	return (
		session ? (
			<div className="container mx-auto py-4">
				<Tabs defaultValue="products" className="w-full">
					<TabsList className="grid w-full grid-cols-4">
						<TabsTrigger value="products">Productos</TabsTrigger>
						<TabsTrigger value="categories">Categorías</TabsTrigger>
						<TabsTrigger value="promotion">Promoción</TabsTrigger>
						<TabsTrigger value="images">Imágenes</TabsTrigger>
					</TabsList>
					<TabsContent value="products">
						<DataTable columns={columns} />
					</TabsContent>
					<TabsContent value="categories">
						<CategoriesAdmin />
					</TabsContent>
					<TabsContent value="promotion">
						<PromotionForm />
					</TabsContent>
					<TabsContent value="images">
						<PromotionsImagesAdmin />
					</TabsContent>
				</Tabs>
			</div>
		) : (
			<LoginPage />
		)
	)
}
