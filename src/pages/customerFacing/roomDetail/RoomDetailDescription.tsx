import { Box } from "@mui/material";
import React from "react";

type Props = {
  desc: string;
};

function RoomDetailDescription({ desc }: Props) {
  return (
    <Box
      sx={{
        padding: "16px 0",
        fontSize: "16px",
        textAlign: "justify",
      }}
    >
      <p>{desc}</p>

      {/* <span
        style={{
          fontWeight: 600,
          color: "#000",
          textDecoration: "underline",
        }}
      >
        Hiển thị thêm
      </span> */}
    </Box>
  );
}

export default RoomDetailDescription;
