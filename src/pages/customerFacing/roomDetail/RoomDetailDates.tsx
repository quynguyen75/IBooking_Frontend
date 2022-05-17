import { Box } from "@mui/material";
import moment from "moment";
import { useState } from "react";

import { DateRange } from "react-date-range";

import "react-date-range/dist/styles.css"; // main css file
import "react-date-range/dist/theme/default.css"; // theme css file

import styles from "./RoomDetailDates.module.css";

type Props = {
  disableDateHandler: (date: Date) => boolean;
  roomDate: any;
  changeRoomDates: (range: any) => void;
};

function RoomDetailDates({
  disableDateHandler,
  roomDate,
  changeRoomDates,
}: Props) {
  return (
    <Box
      sx={{
        padding: "16px 0",
        fontSize: "16px",
      }}
    >
      <h2 className="roomDetail__title">Chọn ngày nhận phòng</h2>
      <span>Thêm ngày để biết giá chính xác</span>

      <DateRange
        className={styles.daterange}
        onChange={changeRoomDates}
        moveRangeOnFirstSelection={false}
        ranges={roomDate}
        showDateDisplay={false}
        minDate={new Date()}
        disabledDay={disableDateHandler}
      />
    </Box>
  );
}

export default RoomDetailDates;
