import { Card, Avatar, Stack } from "@mui/material";

import AvatarImage from "../../assets/img/user.png";

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
        <Avatar alt="Avatar" src={AvatarImage} />
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
