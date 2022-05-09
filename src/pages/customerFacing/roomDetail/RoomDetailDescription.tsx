import { Box } from "@mui/material";
import React from "react";

type Props = {};

function RoomDetailDescription({}: Props) {
  return (
    <Box
      sx={{
        padding: "16px 0",
        fontSize: "16px",
        textAlign: "justify",
      }}
    >
      <p>
        Tôi thích đi du lịch , tôi cũng tận hưởng một không gian thoải mái và ấm
        cúng để thư giãn và nạp năng lượng cho chuyến đi của mình. Đó là lý do
        tại sao tôi tạo homestay này và rất vui được chia sẻ cho bạn. Ngôi nhà
        của tôi nằm ở góc rất trung tâm của Thành phố Hồ Chí Minh. Nhà tôi là sự
        kết hợp hoàn hảo giữa phong cách mộc mạc phương Tây và trang trí tự
        nhiên Việt Nam. Chào mừng bạn đến với không gian của tôi.
      </p>

      <span
        style={{
          fontWeight: 600,
          color: "#000",
          textDecoration: "underline",
        }}
      >
        Hiển thị thêm
      </span>
    </Box>
  );
}

export default RoomDetailDescription;
