import { Product } from "@/types";
import algoliasearch from "algoliasearch";
export const searchClient = algoliasearch(
  "2R137EZE28",
  "cade0612692fdc157fcaa24f6e574add",
);
export const index = searchClient.initIndex("products");

export const indexObject = (products: Product[]) => {
  const productsToIndex = products.map(
    ({ tipo, brand, price, category, description, url, amount, id }) => {
      return {
        objectID: id,
        tipo,
        brand,
        price,
        category,
        description,
        url,
        amount,
      };
    },
  );
  index.saveObjects(productsToIndex, (err: any, products: any) => {
    if (err) {
      console.error(err);
      return;
    }
    console.log("datos", products);
  });
};
