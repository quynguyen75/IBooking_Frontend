import { Link, useRouteMatch } from "react-router-dom";

import { Container, Grid, useMediaQuery } from "@mui/material";
import { Search } from "@mui/icons-material";
import { ChevronLeft } from "@mui/icons-material";

import styles from "./Header.module.css";
import Logo from "components/Logo/Logo";
import HeaderNav from "components/headerNav/HeaderNav";
import { useState } from "react";
import SearchDialog from "components/searchDialog/SearchDialog";
import RoomFilter from "components/roomFilter/RoomFilter";

type Props = {};

function Header({}: Props) {
  const isSearchRoute = useRouteMatch("/search");

  const isTablet = useMediaQuery("(min-width: 768px)");

  const [isOpenSearchMobile, setIsOpenSearchMobile] = useState(false);

  const openSearchMobile = () => setIsOpenSearchMobile(true);
  const closeSearchMobile = () => setIsOpenSearchMobile(false);

  return (
    <header className={styles.header}>
      <Container maxWidth="lg" className={styles["header__container"]}>
        <Logo />
        {isSearchRoute?.isExact || (
          <button className={styles.searchButton} onClick={openSearchMobile}>
            <Search
              style={{
                color: "var(--color-pink)",
              }}
            />
            Bạn sắp đi đâu?
          </button>
        )}

        {isSearchRoute && !isTablet && (
          <Grid
            container
            alignItems="center"
            spacing={2}
            className={styles["dialog__top"]}
          >
            <Grid item xs={1}>
              <Link to="/">
                <ChevronLeft />
              </Link>
            </Grid>

            <Grid
              item
              xs={11}
              sx={{
                display: "flex",
                justifyContent: "center",
              }}
            >
              <RoomFilter />
            </Grid>
          </Grid>
        )}

        <HeaderNav />
      </Container>

      {isSearchRoute && isTablet && (
        <Grid
          container
          alignItems="center"
          sx={{
            m: 1,
          }}
        >
          <Grid
            item
            xs={12}
            style={{
              display: "flex",
              justifyContent: "center",
            }}
          >
            <RoomFilter />
          </Grid>
        </Grid>
      )}

      {isTablet || (
        <SearchDialog
          isOpenSearchMobile={isOpenSearchMobile}
          closeSearchMobile={closeSearchMobile}
        />
      )}
    </header>
  );
}

export default Header;
