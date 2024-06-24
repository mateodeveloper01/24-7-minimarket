import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationPrevious,
  PaginationNext,
} from "@/components";
import { Table } from "@tanstack/react-table";

interface PaginationComponentProps<TData> {
  table: Table<TData>;
}

const PaginationComponent = <TData,>({
  table,
}: PaginationComponentProps<TData>) => {
  const getPageNumbers = () => {
    const totalPages = table.getPageCount();
    const currentPage = table.getState().pagination.pageIndex;
    const delta = 2;
    const range = [];

    for (
      let i = Math.max(2, currentPage - delta);
      i <= Math.min(totalPages - 1, currentPage + delta);
      i++
    ) {
      range.push(i);
    }

    if (currentPage - delta > 2) {
      range.unshift("...");
    }
    if (currentPage + delta < totalPages - 1) {
      range.push("...");
    }

    range.unshift(1);
    if (totalPages > 1) {
      range.push(totalPages);
    }

    return range;
  };

  return (
    <Pagination className="w-full">
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            className="cursor-pointer hover:bg-slate-200"
            onClick={() => table.previousPage()}
          />
        </PaginationItem>
        {/* {getPageNumbers().map((page, index) => (
            <PaginationItem key={index}>
              {page === "..." ? (
                <PaginationEllipsis />
              ) : (
                <PaginationLink
                //   isCurrent={page === table.getState().pagination.pageIndex}
                  onClick={() => table.setPageIndex(page)}
                >
                  {page}
                </PaginationLink>
              )}
            </PaginationItem>
          ))} */}
        <PaginationItem>
          <PaginationNext
            className="cursor-pointer hover:bg-slate-200"
            onClick={() => table.nextPage()}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};

export default PaginationComponent;
