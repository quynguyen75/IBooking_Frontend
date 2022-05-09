import { Container, Typography } from "@mui/material";
import { Link } from "react-router-dom";

import styles from "./FooterColumn.module.css";

interface FooterItem {
  to: string;
  content: string;
}

type Props = {
  heading: string;
  items: FooterItem[];
};

const FooterColumn = ({ heading, items }: Props) => {
  return (
    <div>
      <Typography className={styles.heading} variant="h6" component="div">
        {heading}
      </Typography>
      <ul className={styles.list}>
        {items.map((item) => (
          <li key={item.content}>
            <Link to={item.to}>{item.content}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FooterColumn;
