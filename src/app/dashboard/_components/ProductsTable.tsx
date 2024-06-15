import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components";
import { useProduct } from "@/hooks/useProduct";
import { ProductsRow } from "./ProductsRow";

export const ProductsTable = async () => {
  const { getProducts } = useProduct();
  const products = await getProducts()
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Tipo</TableHead>
          <TableHead>Descripcion</TableHead>
          <TableHead>Marca</TableHead>
          <TableHead>Cantidad</TableHead>
          <TableHead>Precio</TableHead>
          <TableHead>Categoria</TableHead>
          <TableHead>Image</TableHead>
          <TableHead>Stock</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {products.map((product) => (
          <ProductsRow key={product.id} product={product} />
        ))}
      </TableBody>
    </Table>
  );
};
