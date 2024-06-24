"use client";

import {
  ColumnDef,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  PaginationState,
  SortingState,
  useReactTable,
  VisibilityState,
} from "@tanstack/react-table";
import { useMemo, useState } from "react";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { fetchProduct } from "@/hooks/useProduct";
import { Product } from "@/types";
// import TableToolbar from "./TableToolbar";
import TableToolbar from "./TableToolBar";
import TableComponent from "./TableComponent";
import PaginationComponent from "./PaginationComponent";
import ProductSheet from "./ProductSheet";
import { SheetProduct } from "./SheetProduct";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
}

export function DataTable<TData, TValue>({
  columns,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [rowSelection, setRowSelection] = useState({});
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 1,
    pageSize: 10,
  });
  const [searchResults, setSearchResults] = useState<TData[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [open, setOpen] = useState(false);
  const [product, setProduct] = useState<Product>({} as Product);

  const dataQuery = useQuery({
    queryKey: ["products", pagination],
    queryFn: async () =>
      (
        await fetchProduct(
          `/?page=${pagination.pageIndex}&limit=${pagination.pageSize}`,
        )
      ).data,
    placeholderData: keepPreviousData,
  });

  const defaultData = useMemo(() => [], []);
  const data = isSearching ? searchResults : dataQuery.data ?? defaultData;

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    onPaginationChange: setPagination,
    manualPagination: true,
    pageCount: isSearching
      ? Math.ceil(searchResults.length / pagination.pageSize)
      : dataQuery.data?.pageCount ?? -1,
    state: {
      pagination,
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  const handleSearch = (results: TData[]) => {
    setSearchResults(results);
    setIsSearching(true);
  };

  const resetSearch = () => {
    setSearchResults([]);
    setIsSearching(false);
  };

  return (
    <div>
      <div className="flex py-4">
        <SheetProduct />
      </div>
      <TableToolbar
        table={table}
        handleSearch={handleSearch}
        resetSearch={resetSearch}
      />
      <div className="rounded-md border">
        <TableComponent
          table={table}
          columns={columns}
          setProduct={setProduct}
          setOpen={setOpen}
        />
      </div>
      <div className="flex items-center justify-between space-x-2 p-4 w-full">
        <div className="text-sm text-muted-foreground">
          {table.getFilteredSelectedRowModel().rows.length} of{" "}
          {table.getFilteredRowModel().rows.length} row(s) selected.
        </div>
        <div>
          <PaginationComponent table={table} />
        </div>
      </div>
      <ProductSheet
        open={open}
        setOpen={setOpen}
        product={product}
        pagination={pagination}
      />
    </div>
  );
}
