import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationPrevious,
  PaginationNext,
  PaginationLink,
} from "@/components";

interface Props {
  meta: {
    total: number;
    page: number;
    totalPage: number;
  };
  page: number;
  setPage: any;
}

export const PaginationComponent = ({ meta,page,setPage }: Props) => {
  const handlePreviousPage = () => {
    if (page > 1) setPage(page - 1);
  };

  const handleNextPage = () => {
    if (page < meta.totalPage!) setPage(page + 1);
  };
  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            className="cursor-pointer"
            onClick={handlePreviousPage}
          />
        </PaginationItem>
        {Array.from({ length: meta.totalPage! }, (_, index: number) => (
          <PaginationItem
            key={index}
            className={`cursor-pointer rounded-lg ${page === index + 1 ? "bg-slate-500" : ""}`}
          >
            <PaginationLink onClick={() => setPage(index + 1)}>
              {index + 1}
            </PaginationLink>
          </PaginationItem>
        ))}

        <PaginationItem>
          <PaginationNext className="cursor-pointer" onClick={handleNextPage} />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};
