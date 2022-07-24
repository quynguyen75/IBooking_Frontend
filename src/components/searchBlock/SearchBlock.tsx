import { Box, Button, Grid, Paper, useMediaQuery } from "@mui/material";
import { Search } from "@mui/icons-material";
import React, {
  useContext,
  useEffect,
  useReducer,
  useRef,
  useState,
} from "react";

import CustomerAmount from "./CustomerAmount";
import TourDateSearch from "./TourDateSearch";
import TourSearch from "./TourSearch";
import SearchBlockItem from "./SearchBlockItem";
import { objectToURLParams } from "utils/search";
import { useHistory, useLocation } from "react-router-dom";
import { FilterContext } from "context/FilterContext";

type Props = {};

type Action = {
  type: string;
  payload: any;
};

type reducerState = {
  tourSearch: any;
  checkInDate: string;
  checkOutDate: string;
  guestCount: number;
  petCount: number;
};

const initialSearchData = {
  tourSearch: null,
  checkInDate: "",
  checkOutDate: "",
  guestCount: 1,
  petCount: 0,
};

function searchReducer(state: reducerState, action: Action): reducerState {
  switch (action.type) {
    case "TOURSEARCH":
      return {
        ...state,
        tourSearch: action.payload,
      };

    case "CHECKINDATE":
      return {
        ...state,
        checkInDate: action.payload,
      };

    case "CHECKOUTDATE":
      return {
        ...state,
        checkOutDate: action.payload,
      };

    case "GUESTCOUNT":
      return {
        ...state,
        guestCount: action.payload,
      };

    case "PETCOUNT":
      return {
        ...state,
        petCount: action.payload,
      };

    case "CLEAR":
      return initialSearchData;
  }

  return state;
}

function SearchBlock({}: Props) {
  const filterContext = useContext(FilterContext);

  const [tabActive, setTabActive] = useState(0);
  const [searchData, dispatch] = useReducer(searchReducer, initialSearchData);
  const { pathname } = useLocation();
  const history = useHistory();

  const min768px = useMediaQuery("(min-width: 768px)");

  const min900px = useMediaQuery("(min-width: 900px)");

  const containerRef = useRef<HTMLDivElement>(null);

  const autoChangeTabHandler = () => {
    const nextTab = () => setTabActive((tab) => tab + 1);

    if (tabActive === 4) {
      return;
    }

    if (searchData.checkOutDate) {
      nextTab();
      return;
    }

    if (searchData.checkInDate) {
      nextTab();
      return;
    }

    if (searchData.tourSearch) {
      nextTab();
      return;
    }
  };

  const submitHandler = () => {
    if (searchData.tourSearch) {
      let tourSearchParams = objectToURLParams(searchData.tourSearch);

      if (searchData.checkInDate) {
        tourSearchParams = tourSearchParams.concat(
          `&checkInDate=${searchData.checkInDate}`
        );
      }

      if (searchData.checkOutDate) {
        tourSearchParams = tourSearchParams.concat(
          `&checkOutDate=${searchData.checkOutDate}`
        );
      }

      if (searchData.guestCount > 1) {
        tourSearchParams = tourSearchParams.concat(
          `&guestCount=${searchData.guestCount}`
        );
      }

      if (searchData.petCount) {
        tourSearchParams = tourSearchParams.concat(
          `&petCount=${searchData.petCount}`
        );
      }

      filterContext.filterDispatch({
        type: "CLEAR",
      });

      history.push(`/search?${tourSearchParams}`);
    }
  };

  // handle click outside search block
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

  // auto change tab
  useEffect(() => {
    autoChangeTabHandler();
  }, [searchData]);

  // clear search data
  useEffect(() => {
    dispatch({
      type: "CLEAR",
      payload: "",
    });
  }, [pathname]);

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
              <TourSearch
                id={1}
                tabActive={tabActive}
                tourSearch={searchData.tourSearch}
                dispatch={dispatch}
              />
            </SearchBlockItem>
          </Grid>
          <Grid item xs={5.5}>
            <TourDateSearch
              tabActive={tabActive}
              setTabActive={setTabActive}
              dispatch={dispatch}
              checkInDate={searchData.checkInDate}
              checkOutDate={searchData.checkOutDate}
            />
          </Grid>

          <Grid item xs={2.75}>
            <SearchBlockItem
              id={4}
              tabActive={tabActive}
              setTabActive={setTabActive}
            >
              <CustomerAmount
                id={4}
                tabActive={tabActive}
                dispatch={dispatch}
              />
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
              onClick={submitHandler}
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
