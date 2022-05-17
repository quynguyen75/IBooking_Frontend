import React from "react";
import { Card, Avatar, Stack } from "@mui/material";
import { BrightnessMediumTwoTone } from "@mui/icons-material";
import moment from "moment";

type Props = {
  review: any;
};

function ReviewItem({ review }: Props) {
  const reviewDate = new Date(review.publishedAt);
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
            {review.user.username}
          </div>
          <div
            style={{
              fontSize: "14px",
            }}
          >
            Tháng {reviewDate.getMonth() + 1} năm {reviewDate.getFullYear()}
          </div>
        </div>
      </Stack>
      <p>{review.content}</p>
    </Card>
  );
}

export default ReviewItem;
