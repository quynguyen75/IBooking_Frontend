import React, { useEffect, useState } from "react";
import { DateRange } from "react-date-range";
import { Box, Grid } from "@mui/material";
import moment from "moment";

import SearchBlockItem from "./SearchBlockItem";

import styles from "./TourDateSearch.module.css";

type Props = {
  tabActive: number;
  setTabActive: (tab: number) => void;
  dispatch: React.Dispatch<any>;
  checkInDate: string;
  checkOutDate: string;
};

let isInitial = true;

function TourDateSearch({
  tabActive,
  setTabActive,
  dispatch,
  checkInDate,
  checkOutDate,
}: Props) {
  const [dates, setDates] = useState<any>([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);

  const isDisplay = tabActive === 2 || tabActive === 3;

  const dateRangeChangeHandler = (item: any) => {
    isInitial === true && (isInitial = false);
    setDates([item.selection]);
  };

  // dispatch dates to parent
  useEffect(() => {
    if (!isInitial) {
      dispatch({
        type: "CHECKINDATE",
        payload: moment(dates[0].startDate).format("DD/MM/YYYY"),
      });

      dispatch({
        type: "CHECKOUTDATE",
        payload: "",
      });

      if (dates[0].startDate != dates[0].endDate) {
        dispatch({
          type: "CHECKOUTDATE",
          payload: moment(dates[0].endDate).format("DD/MM/YYYY"),
        });
      }
    }
  }, [dates, isInitial]);

  return (
    <>
      <Grid container>
        <Grid item sm={6}>
          <SearchBlockItem
            id={2}
            tabActive={tabActive}
            setTabActive={setTabActive}
          >
            <div className="searchBlock__item">
              <button>
                <span className="searchBlock__heading">Nhận phòng</span>
                <div>
                  <span>{checkInDate ? checkInDate : "Thêm ngày"}</span>
                </div>
              </button>
            </div>
          </SearchBlockItem>
        </Grid>

        <Grid item sm={6}>
          <SearchBlockItem
            id={3}
            tabActive={tabActive}
            setTabActive={setTabActive}
          >
            <div className="searchBlock__item">
              <button>
                <span className="searchBlock__heading">Trả phòng</span>
                <div>
                  <span>{checkOutDate ? checkOutDate : "Thêm ngày"}</span>
                </div>
              </button>
            </div>
          </SearchBlockItem>
        </Grid>
      </Grid>

      {isDisplay && (
        <div className={styles.popover}>
          <DateRange
            onChange={dateRangeChangeHandler}
            moveRangeOnFirstSelection={false}
            months={2}
            ranges={dates}
            direction="horizontal"
            preventSnapRefocus={true}
            calendarFocus="backwards"
            showDateDisplay={false}
            className="checkStatus__dialog"
            minDate={new Date()}
          />
        </div>
      )}
    </>
  );
}

export default TourDateSearch;
