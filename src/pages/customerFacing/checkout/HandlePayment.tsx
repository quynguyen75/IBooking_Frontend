import { Alert, AlertTitle, Container } from "@mui/material";
import Footer from "components/layout/Footer";
import Header from "components/layout/Header";
import { BOOKING_API, ROOM_API } from "constant/resource";
import React, { useEffect } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { formatDataStrapi } from "utils/data";
import { convertSearchToObject } from "utils/search";

import { EMAIL_API, USER_API } from "constant/resource";
import { formatMoney } from "utils/money";

type Props = {};

function HandlePayment({}: Props) {
  const { search } = useLocation();

  const history = useHistory();

  const searchObj = convertSearchToObject(search);

  const isSuccessful = searchObj.vnp_TransactionStatus === "00";

  useEffect(() => {
    if (isSuccessful) {
      let formatedRoom: any;

      const updateBooking = async () => {
        const roomResponse = await fetch(ROOM_API + `/${searchObj.room}`);
        const roomData = await roomResponse.json();
        formatedRoom = formatDataStrapi(roomData);

        const bookingResponse = await fetch(
          BOOKING_API + `/${searchObj.booking}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              data: {
                checkInDate: searchObj.checkInDate,
                checkOutDate: searchObj.checkOutDate,
                guestCount: searchObj.guestCount,
                nightPrice: formatedRoom.nightPrice,
                cleanlinessFee: formatedRoom.cleanlinessFee,
                totalPrice: +searchObj.vnp_Amount / 100,
                bookingStatus: [2],
                paymentStatus: [2],
                paymentType: [1],
                user: [+searchObj.user],
                room: [+searchObj.room],
                paymentReference: searchObj.vnp_TransactionNo,
                bookedAt: new Date(),
                paymentAt: new Date(),
              },
            }),
          }
        );
      };

      const sendEmailToCustomer = async () => {
        const userRespone = await fetch(USER_API + `/${searchObj.user}`);
        const user = await userRespone.json();

        const reponse = await fetch(EMAIL_API, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjUzMjY4NTM4LCJleHAiOjE2NTU4NjA1Mzh9.zHHrsJKL4K1F2FeQymYIbsSLt1PuQTQZtDUVHAPmduw",
          },
          body: JSON.stringify({
            to: user.email,
            from: "nguyentruongquy75@gmail.com",
            replyTo: "nguyentruongquy75@gmail.com",
            subject: "Đặt phòng thành công",
            text: `
            Thông tin chi tiết:
            Tên phòng: ${formatedRoom.title}
            Địa chỉ: ${
              formatedRoom.houseNumber +
              " " +
              formatedRoom.street +
              " " +
              formatedRoom.district +
              " " +
              formatedRoom.city +
              " " +
              formatedRoom.county
            }
            Giá 1 đêm: ${formatMoney(formatedRoom.nightPrice)}
            Ngày nhận phòng: ${searchObj.checkInDate}
            Ngày trả phòng: ${searchObj.checkOutDate}
            Tổng tiền: ${formatMoney(+searchObj.vnp_Amount / 100)}
            `,
          }),
        });
      };

      updateBooking();

      sendEmailToCustomer();

      const timeoutId = setTimeout(() => {
        history.replace("/");
      }, 3000);

      return () => clearTimeout(timeoutId);
    }
  }, []);

  return (
    <>
      <Header />
      <Container
        sx={{
          minHeight: "70vh",
          paddingTop: "100px",
        }}
      >
        {isSuccessful && (
          <Alert severity="success">
            <AlertTitle>Thành công</AlertTitle>
            Đặt phòng thành công - Vui lòng kiểm tra email của bạn để biết thêm
            thông tin
          </Alert>
        )}

        {!isSuccessful && (
          <Alert severity="error">
            <AlertTitle>Lỗi</AlertTitle>
            Thanh toán thất bại
          </Alert>
        )}
      </Container>
      <Footer />
    </>
  );
}

export default HandlePayment;
