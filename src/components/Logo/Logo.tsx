import { Link } from "react-router-dom";
import { useMediaQuery } from "@mui/material";
import styles from "./Logo.module.css";

import LogoIcon from "../../assets/img/logo-icon.png";
import LogoBig from "../../assets/img/logo.png";

type Props = {};

function Logo({}: Props) {
  const maches = useMediaQuery("(min-width: 900px)");

  return (
    <div className={styles.logo}>
      <Link to="/">
        <img src={maches ? LogoBig : LogoIcon} alt="IBooking" />
      </Link>
    </div>
  );
}

export default Logo;
