import React from "react";
import { Card, Avatar, Stack } from "@mui/material";

type Props = {};

function ReviewItem({}: Props) {
  return (
    <Card
      sx={{
        padding: "16px",
      }}
    >
      <Stack direction="row" spacing={2} alignItems="center" mb={2}>
        <Avatar
          alt="Avatar"
          src="https://images.unsplash.com/photo-1527980965255-d3b416303d12?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Nnx8YXZhdGFyfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60"
        />
        <div>
          <div
            style={{
              fontWeight: 600,
            }}
          >
            Truong Quy
          </div>
          <div
            style={{
              fontSize: "14px",
            }}
          >
            tháng 4 năm 2022
          </div>
        </div>
      </Stack>
      <p>
        Chỗ ở sạch sẽ, có trang bị máy giặt sấy khá tiện lợi, ở ngay khu trung
        tâm. Nơi để xe máy thì ở bên ngoài cảm giác hơi không an toàn một chút,
        nhưng anh chủ bảo là an ninh nên cũng yên tâm 🥲 Lorem ipsum, dolor sit
        amet consectetur adipisicing elit. Perferendis doloremque aliquam nobis,
        autem molestiae nulla repudiandae libero similique distinctio fugiat
        dolor cumque eos nisi, non sit placeat eaque eligendi laboriosam.
      </p>
    </Card>
  );
}

export default ReviewItem;
