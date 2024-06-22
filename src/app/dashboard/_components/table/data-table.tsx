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

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  Button,
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
  Input,
  Sheet,
  SheetContent,
  SearchProduct,
} from "@/components";
import { useMemo, useState } from "react";
import { SheetProduct } from "./SheetProduct";
import { Product } from "@/types";
import { ProductForm } from "../ProductForm";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import axios from "axios";

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
  const [product, setProduct] = useState({});
  const dataQuery = useQuery({
    queryKey: ["products", pagination],
    queryFn: async () =>
      (
        await axios.get(
          `http://localhost:3001/api/products?page=${pagination.pageIndex}&limit=${pagination.pageSize}`,
        )
      ).data,
    placeholderData: keepPreviousData, // don't have 0 rows flash while changing pages/loading next page
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
    // pageCount: dataQuery.data?.pageCount ?? -1,
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
      <div className=" flex flex-col md:flex-row  gap-4  items-center justify-around ">
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
                .map((column) => {
                  return (
                    <DropdownMenuCheckboxItem
                      key={column.id}
                      className="capitalize"
                      checked={column.getIsVisible()}
                      onCheckedChange={(value) =>
                        column.toggleVisibility(!!value)
                      }
                    >
                      {column.id}
                    </DropdownMenuCheckboxItem>
                  );
                })}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  onClick={() => {
                    setProduct(row.original as Product);
                    setOpen(true);
                    // console.log(().id)}
                  }}
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="text-sm text-muted-foreground">
          {table.getFilteredSelectedRowModel().rows.length} of{" "}
          {table.getFilteredRowModel().rows.length} row(s) selected.
        </div>
        <div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Anterior
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Siguiente
          </Button>
        </div>
      </div>
      <Sheet open={open} onOpenChange={() => setOpen(!open)}>
        <SheetContent>
          <ProductForm product={product as Product} pagination={pagination} />
        </SheetContent>
      </Sheet>
    </div>
  );
}
