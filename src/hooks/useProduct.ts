export const useProduct = async () => {
  const products = await fetch(
    "https://docs.google.com/spreadsheets/d/e/2PACX-1vRUDSqol3nlP4S4aN26MmFj43ZTSBqFz8PgMnl2T2CvvvhqYOZisb_cweigHNeYfJUUWxKbKnIfYW6k/pub?output=csv",
    { next: { revalidate: 30000 } },
  )
    .then((res) => res.text())
    .then((text) => {
      return text
        .split("\n")
        .slice(1)
        .map((row) => {
          const [id, title, description, category, url, price] = row.split(",");
          const numericPrice = parseFloat(price);

          return { id, title, description, category, url, price: numericPrice };
        });
    });
  return { products };
};
