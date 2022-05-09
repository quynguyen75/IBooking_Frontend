import { Container, Divider, Grid } from "@mui/material";
import FooterColumn from "components/footerColumn/FooterColumn";

import styles from "./Footer.module.css";

type Props = {};

const footerData = [
  {
    heading: "Hỗ trợ",
    items: [
      {
        to: "/",
        content: "Trung tâm trợ giúp",
      },

      {
        to: "/",
        content: "Thông tin an toàn",
      },

      {
        to: "/",
        content: "Báo cáo lo ngại của hàng xóm",
      },
    ],
  },

  {
    heading: "Đón tiếp khách",
    items: [
      {
        to: "/",
        content: "Thử đón tiếp khách",
      },

      {
        to: "/",
        content: "Đón tiếp khách có trách nhiệm",
      },
    ],
  },

  {
    heading: "Giới thiệu",
    items: [
      {
        to: "/",
        content: "Trang tin tức",
      },

      {
        to: "/",
        content: "Nhà đầu tư",
      },
    ],
  },
];

function Footer({}: Props) {
  return (
    <footer className={styles.footer}>
      <Container maxWidth="lg">
        <Grid container direction="row" justifyContent="space-between">
          {footerData.map((column) => (
            <Grid item key={column.heading} xs={12} sm={3}>
              <FooterColumn {...column} />
            </Grid>
          ))}
        </Grid>
      </Container>

      <Container maxWidth="lg">
        <Divider />
        <span
          style={{
            padding: "8px 0",
            display: "block",
          }}
          className={styles.copyright}
        >
          &copy; 2022 IBooking
        </span>
      </Container>
    </footer>
  );
}

export default Footer;
