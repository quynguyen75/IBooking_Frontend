import { CountertopsSharp } from "@mui/icons-material";
import { Badge, Chip } from "@mui/material";
import { FilterContext } from "context/FilterContext";
import React, { useContext, useEffect, useState } from "react";

type DialogProps = {
  isOpen: boolean;
  onClose: () => void;
};

type Props = {
  label: string;
  RenderDialog: React.FC<DialogProps>;
};

function RoomFilterItem({ label, RenderDialog }: Props) {
  const filterContext = useContext(FilterContext);
  const [isOpenDialog, setIsOpenDialog] = useState(false);
  const [filterCount, setFilterCount] = useState(0);

  const openDialog = () => {
    setIsOpenDialog(true);
  };

  const closeDialog = () => {
    setIsOpenDialog(false);
  };

  useEffect(() => {
    if (isOpenDialog) {
      document.body.classList.add("disableScroll");
    }

    return () => document.body.classList.remove("disableScroll");
  }, [isOpenDialog]);

  useEffect(() => {
    switch (label) {
      case "Giá":
        if (
          filterContext.filter.price.from !== 100000 ||
          filterContext.filter.price.to !== 100000000
        )
          setFilterCount(1);
        else setFilterCount(0);
        break;

      case "Loại nơi ở": {
        const count = Object.keys(filterContext.filter.roomType).filter(
          (key) => filterContext.filter.roomType[key]
        ).length;
        setFilterCount(count);
        break;
      }

      case "Tiện nghi": {
        const count = Object.keys(filterContext.filter.amenities).filter(
          (key) => filterContext.filter.amenities[key]
        ).length;
        setFilterCount(count);
        break;
      }

      case "Số lượng phòng":
        const count = Object.keys(filterContext.filter.roomCount).filter(
          (key) => filterContext.filter.roomCount[key] !== 0
        ).length;

        setFilterCount(count);
        break;

      default:
        break;
    }
  }, [filterContext]);

  return (
    <div>
      <Badge badgeContent={filterCount} color="primary">
        <Chip
          label={label}
          variant="outlined"
          onClick={openDialog}
          sx={{
            fontSize: "15px",
          }}
        />
      </Badge>
      <RenderDialog isOpen={isOpenDialog} onClose={closeDialog} />
    </div>
  );
}

export default RoomFilterItem;
