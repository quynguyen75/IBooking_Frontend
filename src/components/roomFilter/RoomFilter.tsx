import { Button, Stack } from "@mui/material";
import SwipeableViews from "react-swipeable-views";
import AmenitiesDialog from "components/amenitiesDialog/AmenitiesDialog";
import FilterAllDialog from "components/filterAllDialog/FilterAllDialog";
import PriceDialog from "components/priceDialog/PriceDialog";
import RoomTypeDialog from "components/roomTypeDialog/RoomTypeDialog";
import RoomFilterItem from "./RoomFilterItem";
import {
  FilterContext,
  initialState as initialFilter,
} from "context/FilterContext";
import { useContext } from "react";

type Props = {};

function RoomFilter({}: Props) {
  const filterContext = useContext(FilterContext);

  const isDisplayClearAll =
    JSON.stringify(initialFilter) !== JSON.stringify(filterContext.filter);

  const clearAllFilter = () => {
    filterContext.filterDispatch({
      type: "CLEAR",
    });
  };

  return (
    // <SwipeableViews enableMouseEvents>
    <Stack direction="row" spacing={1}>
      <RoomFilterItem label="Giá" RenderDialog={PriceDialog} />
      <RoomFilterItem label="Loại nơi ở" RenderDialog={RoomTypeDialog} />
      <RoomFilterItem label="Tiện nghi" RenderDialog={AmenitiesDialog} />
      <RoomFilterItem label="Số lượng phòng" RenderDialog={FilterAllDialog} />

      {isDisplayClearAll && (
        <Button variant="text" onClick={clearAllFilter}>
          Bỏ lọc
        </Button>
      )}
    </Stack>
    // </SwipeableViews>
  );
}

export default RoomFilter;
