
import { DataTable } from './_components/table/data-table'
import { columns } from './_components/table/columns'
import { auth0 } from '@/lib/auth0';
import LoginPage from '../(shop)/(home)/admin/page';

export default async function Dashboard() {
	const session = await auth0.getSession();

	return (
		<div className="container mx-auto py-10">
			{session ? <DataTable columns={columns} /> : <LoginPage />}
		</div>
	)
}
