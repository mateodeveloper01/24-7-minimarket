'use client'

import { DataTable } from './_components/table/data-table'
import { columns } from './_components/table/columns'

export default function Dashboard() {
	return (
		<div className="container mx-auto py-10">
			<DataTable columns={columns} />
		</div>
	)
}
