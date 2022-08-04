export const formatMoney = (money: number) => {
  return money.toLocaleString() + "đ";
};

export const moneyStringToNumber = (money: string) => {
  if (!money) return;
  return Number(money.replace(/[^0-9.-]+/g, ""));
};
