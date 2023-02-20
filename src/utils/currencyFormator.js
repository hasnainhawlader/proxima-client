export const currencyFormator = (amount) => {
  return amount?.toLocaleString("en-us", {
    style: "currency",
    currency: "USD",
  });
};
