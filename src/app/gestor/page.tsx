
import { DataTable } from './_components/table/data-table'
import { columns } from './_components/table/columns'
import { auth0 } from '@/lib/auth0';
import LoginPage from '../(shop)/(home)/admin/page';
import { CategoriesAdmin } from './_components/CategoriesAdmin';
import { PromotionForm } from './_components/PromotionForm';

export default async function Dashboard() {
	const session = await auth0.getSession();
	return (
		session ? (
			<>
				<CategoriesAdmin />
				<PromotionForm />

				<div className="container mx-auto py-4">
					<DataTable columns={columns} />
				</div>
			</>
		) : (
			<LoginPage />
		)
	)
}
