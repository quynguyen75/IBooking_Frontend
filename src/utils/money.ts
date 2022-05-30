export const formatMoney = (money: number) => {
  return money.toLocaleString("en-US", {
    style: "currency",
    currency: "VND",
  });
};

export const moneyStringToNumber = (money: string) => {
  if (!money) return;
  return Number(money.replace(/[^0-9.-]+/g, ""));
};
