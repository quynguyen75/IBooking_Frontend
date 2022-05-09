import {
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
} from "@mui/material";
import { AMENITIES } from "../../constant/resource";
import RoomFilterDialog from "components/roomFilter/RoomFilterDialog";

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

function AmenitiesDialog({ isOpen, onClose }: Props) {
  return (
    <div>
      <RoomFilterDialog isOpen={isOpen} onClose={onClose} title="Tiện nghi">
        <FormControl component="fieldset">
          <FormGroup>
            {AMENITIES.map((item) => (
              <FormControlLabel
                control={<Checkbox name={item.name} />}
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
