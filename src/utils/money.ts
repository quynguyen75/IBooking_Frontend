export const formatMoney = (money: number) => {
  return money.toLocaleString(undefined, {
    style: "currency",
    currency: "VND",
  });
};
