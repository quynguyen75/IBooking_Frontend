import React from "react";

import { Card, Typography, Button } from "@mui/material";

import styles from "./BecomeHost.module.css";
import { Link } from "react-router-dom";

type Props = {};

function BecomeHostSection({}: Props) {
  return (
    <section className="section">
      <Card className={styles.card}>
        <Typography variant="h5" fontWeight={500}>
          Trở thành chủ nhà
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Kiếm thêm thu nhập và mở khóa các cơ hội mới bằng cách chia sẻ không
          gian của bạn
        </Typography>
        <Link to="/host/manage">
          <Button variant="contained" color="warning">
            Tìm hiểu thêm
          </Button>
        </Link>
      </Card>
    </section>
  );
}

export default BecomeHostSection;
