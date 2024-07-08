import { ProductItem } from "./ProductItem";
import { Title } from "../ui/Title";
import Link from "next/link";
import { Button } from "../ui/button";
import { getFetchProduct } from "@/hooks/useProduct";
import { Carousel, CarouselContent, CarouselItem } from "../ui/carousel";

interface Prop {
  category: string;
  limit?: number;
  className?: string;
}
export const ProductsCarrousel = async ({ category }: Prop) => {
  const products = await getFetchProduct({ category });
  if (products.data.length !== 0) {
    return (
      <div className="w-4/5 flex flex-col gap-5">
        <div className="border-b-2 border-black pb-2  flex justify-between ">
          <Title>Productos {category}</Title>
          <Link href={`/${category}`}>
            <Button>Ver todo</Button>
          </Link>
        </div>
        <Carousel className="w-full ">
          <CarouselContent className="-ml-1">
            {products.data.map((product) => (
              <CarouselItem
                key={product.id}
                className="pl-1 basis-4/7 "
              >
                <ProductItem {...product} />
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>
    );
  }
};
