import {
  Button,
  Checkbox,
  CircularProgress,
  FormControl,
  FormControlLabel,
  FormGroup,
} from "@mui/material";

import useFetch from "hooks/useFetch";

import RoomFilterDialog from "components/roomFilter/RoomFilterDialog";
import { ROOM_TYPE_API } from "constant/resource";
import { useContext, useEffect, useState } from "react";
import { FilterContext } from "context/FilterContext";

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

function RoomTypeDialog({ isOpen, onClose }: Props) {
  const filterContext = useContext(FilterContext);

  const [status, roomTypes] = useFetch(ROOM_TYPE_API);

  const [roomTypeOptions, setRoomTypeOptions] = useState<any>(
    filterContext.filter.roomType
  );

  const checkboxChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRoomTypeOptions((options: any) => ({
      ...options,
      [e.target.name]: e.target.checked,
    }));
  };

  const filterHandler = () => {
    onClose();

    filterContext.filterDispatch({
      type: "ROOM_TYPE",
      payload: roomTypeOptions,
    });
  };

  useEffect(() => {
    if (!isOpen) {
      setRoomTypeOptions(filterContext.filter.roomType);
    }
  }, [isOpen]);

  return (
    <div>
      <RoomFilterDialog
        isOpen={isOpen}
        onClose={onClose}
        title="Loại nơi ở"
        buttonAction={
          <Button variant="contained" onClick={filterHandler}>
            Lọc
          </Button>
        }
      >
        {status === "loading" && <CircularProgress />}
        <FormControl component="fieldset">
          <FormGroup>
            {roomTypes &&
              roomTypes.data.map(
                (type: {
                  id: number;
                  attributes: {
                    name: string;
                    label: string;
                    desc: string;
                  };
                }) => (
                  <FormControlLabel
                    control={
                      <Checkbox
                        name={type.attributes.name}
                        onChange={checkboxChangeHandler}
                        checked={roomTypeOptions[type.attributes.name]}
                      />
                    }
                    label={type.attributes.label}
                    key={type.id}
                  />
                )
              )}
          </FormGroup>
        </FormControl>
      </RoomFilterDialog>
    </div>
  );
}

export default RoomTypeDialog;
