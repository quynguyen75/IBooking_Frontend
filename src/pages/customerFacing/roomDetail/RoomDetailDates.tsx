import { Box } from "@mui/material";
import { useState } from "react";

import { DateRange } from "react-date-range";

import "react-date-range/dist/styles.css"; // main css file
import "react-date-range/dist/theme/default.css"; // theme css file

import styles from "./RoomDetailDates.module.css";

type Props = {};

function RoomDetailDates({}: Props) {
  const [state, setState] = useState<any>([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);

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
        onChange={(item) => setState([item.selection])}
        moveRangeOnFirstSelection={false}
        ranges={state}
        showDateDisplay={false}
        minDate={new Date()}
      />
    </Box>
  );
}

export default RoomDetailDates;
