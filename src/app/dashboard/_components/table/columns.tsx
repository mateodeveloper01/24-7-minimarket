"use client";

import { Product } from "@/types";
import { ColumnDef, FilterFn, Row } from "@tanstack/react-table";
import Image from "next/image";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";
import {
  Button,
  Checkbox,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components";
import { removeProduct } from "@/api";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

const myCustomFilterFn: FilterFn<Product> = (
  row: Row<Product>,
  columnId: string,
  filterValue: string,
  addMeta: (meta: any) => void,
) => {
  const { tipo, brand, description, category } = row.original;
  filterValue = filterValue.toLowerCase();
  const filterParts = filterValue.split(" ");
  const rowValues = `${tipo} ${brand} ${description} ${category}`;

  return filterParts.every((part) => rowValues.includes(part));
};

const getImage = (row: Row<Product>) => {
  let result = "no_image_product.png";
  const { image, url } = row.original;
  if (image) {
    result = image.url;
  }
  if (url) {
    result = url;
  }
  return result;
};

export const columns: ColumnDef<Product>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value: any) =>
          table.toggleAllPageRowsSelected(!!value)
        }
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value: any) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "tipo",
    filterFn: myCustomFilterFn,
    header: ({ column }) => sort(column, "Tipo"),
  },
  {
    accessorKey: "description",
    header: ({ column }) => sort(column, "Description"),
  },
  {
    accessorKey: "brand",
    header: ({ column }) => sort(column, "Marca"),
  },
  {
    accessorKey: "category",
    header: ({ column }) => sort(column, "Categoria"),
  },
  {
    accessorKey: "amount",
    header: "Cantidad",
  },
  {
    accessorKey: "price",
    header: "Precio",
  },

  {
    accessorKey: "stock",
    header: ({ column }) => sort(column, "Stock"),
  },

  {
    accessorKey: "url",
    header: "Image",
    filterFn: myCustomFilterFn,
    cell: ({ row }) => {
      const url = getImage(row);
      return (
        <Image
          src={url}
          alt=""
          width={50}
          height={50}
          className="max-h-[45px] w-auto"
        />
      );
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const product = row.original;
      const remove = removeProduct();

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" onClick={(e) => e.stopPropagation()}>
            <DropdownMenuLabel>Acciones</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={(e) => {
                e.stopPropagation();
                remove.mutate(product.id);
              }}
            >
              <Button>Eliminar</Button>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
const sort = (column: any, title: string) => {
  return (
    <Button
      variant="ghost"
      onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
    >
      {title}
      <ArrowUpDown className="ml-2 h-4 w-4" />
    </Button>
  );
};
