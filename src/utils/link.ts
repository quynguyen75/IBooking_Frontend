import moment from "moment";
import sha256 from "sha256";
import qs from "qs";

type params = {
  amount: number;
  user: number;
  room: number;
  checkInDate: string;
  checkOutDate: string;
  guestCount: number;
  booking: number;
};

function sortObj(obj: any) {
  return Object.keys(obj)
    .sort()
    .reduce((acc: any, key) => {
      acc[key] = obj[key];
      return acc;
    }, {});
}

export function generatePaymnentLink({
  amount,
  user,
  room,
  checkInDate,
  checkOutDate,
  guestCount,
  booking,
}: params) {
  const createDate = parseInt(moment().format("YYYYMMDDHHmmss"));

  const paramsObject = {
    vnp_Version: "2.0.0",
    vnp_CurrCode: "VND",
    vnp_TmnCode: "945CY5Z9",
    vnp_Locale: "vn",
    vnp_IpAddr: "125.235.239.230",
    vnp_Command: "pay",
    vnp_ReturnUrl: `https://ibooking.netlify.app/handlepayment?user=${user}&room=${room}&checkInDate=${checkInDate}&checkOutDate=${checkOutDate}&guestCount=${guestCount}&booking=${booking}`,
    vnp_TxnRef: createDate + amount,
    vnp_OrderInfo: "Thanh toan hoa don dich vu",
    vnp_OrderType: 170000,
    vnp_Amount: amount * 100,
    vnp_CreateDate: createDate,
    vnp_ExpireDate: createDate + 1500,
  };

  const hash = sha256(
    "XKPCJCPEEOMFWCNXQMCEEZINFXDCFIAP" +
      qs.stringify(sortObj(paramsObject), { encode: false })
  );

  return `https://sandbox.vnpayment.vn/paymentv2/vpcpay.html?vnp_Version=2.0.0&vnp_CurrCode=VND&vnp_TmnCode=945CY5Z9&vnp_Locale=vn&vnp_IpAddr=125.235.239.230&vnp_Command=pay&vnp_ReturnUrl=https%3A%2F%2Fibooking.netlify.app%2Fhandlepayment%3Fuser%3D${user}%26room%3D${room}%26checkInDate%3D${checkInDate}%26checkOutDate%3D${checkOutDate}%26guestCount%3D${guestCount}%26booking%3D${booking}&vnp_TxnRef=${
    createDate + amount
  }&vnp_OrderInfo=Thanh%20toan%20hoa%20don%20dich%20vu&vnp_OrderType=170000&vnp_Amount=${
    amount * 100
  }&vnp_CreateDate=${createDate}&vnp_ExpireDate=${
    createDate + 1500
  }&vnp_SecureHashType=SHA256&vnp_SecureHash=${hash}`;
}
