import { Box, Button, Grid, Paper, useMediaQuery } from "@mui/material";
import { Search } from "@mui/icons-material";
import React, { useEffect, useRef, useState } from "react";
import CustomerAmount from "./CustomerAmount";
import TourDateSearch from "./TourDateSearch";
import TourSearch from "./TourSearch";
import SearchBlockItem from "./SearchBlockItem";

type Props = {};

function SearchBlock({}: Props) {
  const min768px = useMediaQuery("(min-width: 768px)");

  const min900px = useMediaQuery("(min-width: 900px)");

  const containerRef = useRef<HTMLDivElement>(null);
  const [tabActive, setTabActive] = useState(0);

  useEffect(() => {
    function handleClickOutside(event: any) {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target)
      ) {
        setTabActive(0);
      }
    }

    if (tabActive > 0) {
      document.addEventListener("click", handleClickOutside);
    }

    return () => document.removeEventListener("click", handleClickOutside);
  }, [containerRef, tabActive]);

  return (
    <div
      ref={containerRef}
      className={min768px ? "" : "hide"}
      style={{
        width: min900px ? "80%" : "unset",
        margin: "0 auto",
      }}
    >
      <Paper
        elevation={0}
        style={{
          position: "relative",
          border: "1px solid #eee",
          borderRadius: "32px",
          margin: "8px 0",
          backgroundColor: tabActive > 0 ? "#fafafa" : "#fff",
        }}
      >
        <Grid container>
          <Grid item xs={2.75}>
            <SearchBlockItem
              id={1}
              tabActive={tabActive}
              setTabActive={setTabActive}
            >
              <TourSearch id={1} tabActive={tabActive} />
            </SearchBlockItem>
          </Grid>
          <Grid item xs={5.5}>
            <TourDateSearch tabActive={tabActive} setTabActive={setTabActive} />
          </Grid>

          <Grid item xs={2.75}>
            <SearchBlockItem
              id={4}
              tabActive={tabActive}
              setTabActive={setTabActive}
            >
              <CustomerAmount id={4} tabActive={tabActive} />
            </SearchBlockItem>
          </Grid>

          <Grid
            item
            xs={1}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Button
              style={{
                borderRadius: "50%",
                width: "50px",
                height: "50px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                background: "#1976D2",
                color: "white",
                minWidth: "unset",
              }}
            >
              <Search />
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
}

export default SearchBlock;
