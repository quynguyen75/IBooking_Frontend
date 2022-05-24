import { Stack } from "@mui/material";
import AmenitiesDialog from "components/amenitiesDialog/AmenitiesDialog";
import FilterAllDialog from "components/filterAllDialog/FilterAllDialog";
import PriceDialog from "components/priceDialog/PriceDialog";
import RoomTypeDialog from "components/roomTypeDialog/RoomTypeDialog";
import RoomFilterItem from "./RoomFilterItem";

type Props = {};

function RoomFilter({}: Props) {
  return (
    <Stack direction="row" spacing={1}>
      <RoomFilterItem label="Giá" RenderDialog={PriceDialog} />
      <RoomFilterItem label="Loại nơi ở" RenderDialog={RoomTypeDialog} />
      <RoomFilterItem label="Tiện nghi" RenderDialog={AmenitiesDialog} />
      <RoomFilterItem label="Số lượng phòng" RenderDialog={FilterAllDialog} />
    </Stack>
  );
}

export default RoomFilter;
