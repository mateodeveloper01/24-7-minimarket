interface Props {
  tipo: string;
  description: string;
  amount: string;
  brand: string;
}

export const ProductTitle = ({ amount, brand, description, tipo }: Props) => {
  return (
    <p className="text-xl font-semibold mb-2 capitalize-first-letter">
      {tipo} {description} <span className="capitalize">{brand} </span>
      {amount}
    </p>
  );
};
