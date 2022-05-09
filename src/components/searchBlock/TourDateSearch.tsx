import { Box, Grid } from "@mui/material";
import React, { useState } from "react";
import { DateRange } from "react-date-range";
import SearchBlockItem from "./SearchBlockItem";
import styles from "./TourDateSearch.module.css";
type Props = {
  tabActive: number;
  setTabActive: (tab: number) => void;
};

function TourDateSearch({ tabActive, setTabActive }: Props) {
  const [dates, setDates] = useState<any>([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);

  const isDisplay = tabActive === 2 || tabActive === 3;
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
                  <span>Thêm ngày</span>
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
                  <span>Thêm ngày</span>
                </div>
              </button>
            </div>
          </SearchBlockItem>
        </Grid>
      </Grid>

      {isDisplay && (
        <div className={styles.popover}>
          <DateRange
            onChange={(item) => setDates([item.selection])}
            moveRangeOnFirstSelection={false}
            months={2}
            ranges={dates}
            direction="horizontal"
            preventSnapRefocus={true}
            calendarFocus="backwards"
            showDateDisplay={false}
            className="checkStatus__dialog"
          />
        </div>
      )}
    </>
  );
}

export default TourDateSearch;
