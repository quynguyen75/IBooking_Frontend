import React from "react";

import { Card, CardMedia, CardContent, Typography } from "@mui/material";

import styles from "./TourItem.module.css";

type Props = {
  image: any;
  content: string;
  backgroundColor: string;
};

function TourItem({ image, content, backgroundColor }: Props) {
  return (
    <Card
      style={{
        borderRadius: "12px",
      }}
    >
      <CardMedia component="img" height="140" image={image} alt={content} />

      <CardContent
        style={{
          backgroundColor,
        }}
      >
        <Typography
          style={{
            fontSize: "18px",
            fontWeight: "500",
            color: "#fff",
          }}
          gutterBottom
          variant="h5"
          component="div"
        >
          {content}
        </Typography>
      </CardContent>
    </Card>
  );
}

export default TourItem;
