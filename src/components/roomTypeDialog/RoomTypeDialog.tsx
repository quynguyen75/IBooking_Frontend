import { Close } from "@mui/icons-material";
import {
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
} from "@mui/material";
import RoomFilterDialog from "components/roomFilter/RoomFilterDialog";

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

function RoomTypeDialog({ isOpen, onClose }: Props) {
  return (
    <div>
      <RoomFilterDialog isOpen={isOpen} onClose={onClose} title="Loại nơi ở">
        <FormControl component="fieldset">
          <FormGroup>
            <FormControlLabel
              control={<Checkbox name="Rental Unit" />}
              label="Căn hộ cho thuê"
            />
            <FormControlLabel
              control={<Checkbox name="Apartment" />}
              label="Căn hộ chung cư cao cấp"
            />
            <FormControlLabel
              control={<Checkbox name="Loft" />}
              label="Tầng lửng"
            />

            <FormControlLabel
              control={<Checkbox name="Serviced Apartment" />}
              label="Căn hộ dịch vụ"
            />

            <FormControlLabel
              control={<Checkbox name="Holiday home" />}
              label="Nhà nghỉ dưỡng"
            />
          </FormGroup>
        </FormControl>
      </RoomFilterDialog>
    </div>
  );
}

export default RoomTypeDialog;
