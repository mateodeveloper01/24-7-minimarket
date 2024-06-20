import { FC } from "react";

interface Props {
  tipo: string;
  description: string;
  amount: string;
  brand: string;
  className?: string;
}

export const ProductTitle: FC<Props> = ({
  amount,
  brand,
  description,
  tipo,
  className,
}) => {
  return (
    <p
      className={`${className} text-base font-semibold mb-2  md:text-xl line-clamp-2`}
    >
      <span className="capitalize">{tipo}</span> {description}{" "}
      <span className="capitalize">{brand} </span>
      {amount}
    </p>
  );
};
