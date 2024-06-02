import { Product } from "@/types";
import PocketBase from "pocketbase";

export const useProduct = async () => {
  const client = new PocketBase(process.env.NEXT_PUBLIC_BACKEND_URL);
  const productsList = await client
    .collection("products")
    .getList(1,20, {
      cache: "no-cache",
    });
  // console.log(productsList);
  const products: Product[] = productsList.items.map((item) => {
    return {
      id: item.id as string,
      tipo: item.tipo as string,
      description: item.description as string,
      price: item.price as number,
      amount: item.amount as string,
      stock: item.stock as boolean,
      brand: item.brand as string,
      category: item.category as string,
      url: item.url as string,
    };
  });
  return { products };
};

// const products = await fetch(
//   "https://docs.google.com/spreadsheets/d/e/2PACX-1vS4KHHgg8XLvDo6CQ0tHVtpHLYWDCxeeFhuEgxHK6NI0pSdlnNM6HjnBGltQylWY5s86ZpgYbS1CpD2/pub?output=csv",
//   { next: { revalidate: 30000 } },
// )
//   .then((res) => res.text())
//   .then((text) => {
//     return text
//       .split("\n")
//       .slice(1)
//       .map((row) => {
//         const [id, tipo,  description, brand, amount, price,category, url] =
//           row.split(",");
//         const numericPrice = parseFloat(price);
//         return {
//           id, tipo, brand, price:numericPrice, category, description, url, amount
//         };
//       });
//   });
