import Image from 'next/image';
import React from 'react'
import { AddCartButton } from '../cart/AddCartButton';

interface Prop{
    product:any
}
export const SearchProductItem = ({product}:Prop) => {
    const { url, tipo, description, brand, amount, price,objectID ,category } = product;
    return (
      <article  className="flex justify-between items-center gap-4  mb-1 shadow-md ">
        <div className="flex items-center gap-3">
          <Image src={url} alt={tipo} width={60} height={60} />
          <div className="flex flex-col">
            <span className="font-bold flex-1">
              {tipo} {description} {brand} {amount}
            </span>
            <span className="text-gray-400 font-bold">${price}</span>
          </div>
        </div>
        <AddCartButton product={{ url, tipo, description, brand, amount, price,id:objectID,category }} />
      </article>
    );
}
