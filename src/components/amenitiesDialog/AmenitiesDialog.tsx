import {
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
} from "@mui/material";
import { AMENITIES } from "../../constant/resource";
import RoomFilterDialog from "components/roomFilter/RoomFilterDialog";
import React, { useContext, useEffect, useState } from "react";
import { FilterContext } from "context/FilterContext";

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

function AmenitiesDialog({ isOpen, onClose }: Props) {
  const filterContext = useContext(FilterContext);

  const [amenityOptions, setAmenityOptions] = useState<any>({});

  const checkboxChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAmenityOptions((options: any) => ({
      ...options,
      [e.target.name]: e.target.checked,
    }));
  };

  const filterHandler = () => {
    onClose();

    filterContext.filterDispatch({
      type: "AMENITIES",
      payload: amenityOptions,
    });
  };

  useEffect(() => {
    if (!isOpen) {
      setAmenityOptions(filterContext.filter.amenities);
    }
  }, [isOpen]);

  useEffect(() => {
    setAmenityOptions(filterContext.filter.amenities);
  }, [filterContext.filter]);

  return (
    <div>
      <RoomFilterDialog
        isOpen={isOpen}
        onClose={onClose}
        title="Tiện nghi"
        buttonAction={
          <Button variant="contained" onClick={filterHandler}>
            Lọc
          </Button>
        }
      >
        <FormControl component="fieldset">
          <FormGroup>
            {AMENITIES.map((item) => (
              <FormControlLabel
                control={
                  <Checkbox
                    name={item.name}
                    onChange={checkboxChangeHandler}
                    checked={amenityOptions[item.name]}
                  />
                }
                label={item.label}
              />
            ))}
          </FormGroup>
        </FormControl>
      </RoomFilterDialog>
    </div>
  );
}

export default AmenitiesDialog;
