"use client";
import {
  Sheet,
  SheetClose,
  SheetContent,
  TableCell,
  TableRow,
} from "@/components";
import { Product } from "@/types";
import Image from "next/image";
import React, { useState } from "react";
import { X } from "lucide-react";
import { ProductForm } from "./ProductForm";

interface Props {
  product: Product;
}

export const ProductsRow = ({ product }: Props) => {
  const { amount, brand, category, description, price, stock, tipo, url } =
    product;
  const [open, setOpen] = useState(false);
  return (
    <>
      <TableRow
        onClick={() => {
          setOpen(true);
          setTimeout(() => {
            // setOpen(false);
          }, 1000);
        }}
        className="hover:bg-slate-200"
      >
        <TableCell className="capitalize">{tipo}</TableCell>
        <TableCell className="capitalize">{description}</TableCell>
        <TableCell className="capitalize">{brand}</TableCell>
        <TableCell className="capitalize">{amount}</TableCell>
        <TableCell className="capitalize">{price}</TableCell>
        <TableCell className="capitalize">{category}</TableCell>
        <TableCell className="capitalize">
          <Image src={url?url:''} width={50} height={50} alt="" />
        </TableCell>
        <TableCell className="capitalize">{stock ? "True" : "false"}</TableCell>
      </TableRow>
      <Sheet open={open} onOpenChange={() => setOpen(!open)}>
        {/* <SheetClose
          onClick={() => setOpen(false)}
          className=" absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-secondary"
        >
          <X className="h-4 w-4" />
          <span className="sr-only">Close</span>
        </SheetClose> */}
        <SheetContent>
          <ProductForm  product={product}/>
        </SheetContent>
      </Sheet>
    </>
  );
};
