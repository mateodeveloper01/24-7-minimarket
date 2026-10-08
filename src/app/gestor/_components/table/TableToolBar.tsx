import type { RowData, Table } from '@tanstack/react-table'
import type { ProductTableFeatures } from './table-features'
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { Button } from '@/components/ui/button'
import { SearchProduct } from '@/components/search/SearchProduct'

interface TableToolbarProps<TData extends RowData> {
	table: Table<ProductTableFeatures, TData>
	handleSearch: (results: TData[]) => void
	resetSearch: () => void
}

const TableToolbar = <TData extends RowData,>({ table, handleSearch, resetSearch }: TableToolbarProps<TData>) => {
	return (
		<div className="flex flex-col md:flex-row gap-4 items-center justify-around">
			<div className="flex items-center py-4 justify-around w-full">
				<SearchProduct setProducts={handleSearch} resetSearch={resetSearch} />
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<Button variant="outline" className="ml-auto">
							Columns
						</Button>
					</DropdownMenuTrigger>
					<DropdownMenuContent align="end">
						{table
							.getAllColumns()
							.filter((column) => column.getCanHide())
							.map((column) => (
								<DropdownMenuCheckboxItem key={column.id} className="capitalize" checked={column.getIsVisible()} onCheckedChange={(value) => column.toggleVisibility(!!value)}>
									{column.id}
								</DropdownMenuCheckboxItem>
							))}
					</DropdownMenuContent>
				</DropdownMenu>
			</div>
		</div>
	)
}

export default TableToolbar
