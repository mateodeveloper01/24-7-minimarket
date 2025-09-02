import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '@/components/ui/pagination'

interface Props {
	meta: {
		total: number
		page: number
		totalPage: number
	}
	page: number
	setPage: any
}

export const PaginationComponent = ({ meta, page, setPage }: Props) => {
	const handlePreviousPage = () => {
		if (page > 1) setPage(page - 1)
	}

	const handleNextPage = () => {
		if (page < meta.totalPage) setPage(page + 1)
	}

	const PaginationItems = () => {
		const { totalPage } = meta
		let startPage = 1
		let endPage = meta.totalPage > 3 ? 3 : meta.totalPage

		if (page > 1) {
			if (page === totalPage) {
				startPage = totalPage - 2
				endPage = totalPage
			} else {
				startPage = page - 1
				endPage = page + 1
			}
		}

		return (
			<>
				{startPage > 1 && <PaginationEllipsis onClick={() => setPage(1)} />}
				{Array.from({ length: endPage - startPage + 1 }, (_, index: number) => {
					const currentPage = startPage + index
					return (
						<PaginationItem key={currentPage} className={`cursor-pointer rounded-lg ${page === currentPage ? 'bg-slate-500' : ''}`}>
							<PaginationLink onClick={() => setPage(currentPage)}>{currentPage}</PaginationLink>
						</PaginationItem>
					)
				})}
				{endPage < totalPage && <PaginationEllipsis onClick={() => setPage(totalPage)} />}
			</>
		)
	}

	return (
		<Pagination>
			<PaginationContent>
				<PaginationItem>
					<PaginationPrevious className="cursor-pointer" onClick={handlePreviousPage} />
				</PaginationItem>
				<PaginationItems />

				{/* {renderPaginationItems()} */}

				<PaginationItem>
					<PaginationNext className="cursor-pointer" onClick={handleNextPage} />
				</PaginationItem>
			</PaginationContent>
		</Pagination>
	)
}
