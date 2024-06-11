interface Props {
  tipo: string;
  description: string;
  amount: string;
  brand: string;
}

export const ProductTitle = ({ amount, brand, description, tipo }: Props) => {
  return (
    <p className="text-base font-semibold mb-2 capitalize-first-letter md:text-xl">
      {tipo} {description} <span className="capitalize">{brand} </span>
      {amount}
    </p>
  );
};
