import { Stack } from "@mui/material";
import SwipeableViews from "react-swipeable-views";
import AmenitiesDialog from "components/amenitiesDialog/AmenitiesDialog";
import FilterAllDialog from "components/filterAllDialog/FilterAllDialog";
import PriceDialog from "components/priceDialog/PriceDialog";
import RoomTypeDialog from "components/roomTypeDialog/RoomTypeDialog";
import RoomFilterItem from "./RoomFilterItem";

type Props = {};

function RoomFilter({}: Props) {
  return (
    <SwipeableViews enableMouseEvents>
      <Stack direction="row" spacing={1}>
        <RoomFilterItem label="Giá" RenderDialog={PriceDialog} />
        <RoomFilterItem label="Loại nơi ở" RenderDialog={RoomTypeDialog} />
        <RoomFilterItem label="Tiện nghi" RenderDialog={AmenitiesDialog} />
        <RoomFilterItem label="Số lượng phòng" RenderDialog={FilterAllDialog} />
      </Stack>
    </SwipeableViews>
  );
}

export default RoomFilter;
