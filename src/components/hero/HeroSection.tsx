import React from "react";

import { Card } from "@mui/material";

import styles from "./HeroSection.module.css";
import SearchBlock from "components/searchBlock/SearchBlock";

type Props = {};

function HeroSection({}: Props) {
  return (
    <section>
      <Card className={styles.card}>
        <span>Chúng tôi cung cấp mọi thứ ngay tại đây, nơi bạn cần</span>
      </Card>
    </section>
  );
}

export default HeroSection;
