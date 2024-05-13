export const useProduct = async () => {
  const products = await fetch(
    "https://docs.google.com/spreadsheets/d/e/2PACX-1vS4KHHgg8XLvDo6CQ0tHVtpHLYWDCxeeFhuEgxHK6NI0pSdlnNM6HjnBGltQylWY5s86ZpgYbS1CpD2/pub?output=csv",
    { next: { revalidate: 30000 } },
  )
    .then((res) => res.text())
    .then((text) => {
      return text
        .split("\n")
        .slice(1)
        .map((row) => {
          const [id, tipo,  description, brand, amount, price,category, url] =
            row.split(",");
          const numericPrice = parseFloat(price);
          return {
            id, tipo, brand, price:numericPrice, category, description, url, amount
          };
        });
    });
  return { products };
};
