import {
  Box,
  Button,
  Dialog,
  FormControlLabel,
  Grid,
  IconButton,
  Stack,
  TextField,
} from "@mui/material";
import { Switch } from "@pankod/refine-antd";
import NumberFormat from "react-number-format";
import { AMENITIES } from "constant/resource";
import { Close } from "@mui/icons-material";

type Props = {
  open: boolean;
  onClose: () => void;
};

function EditRoomDialog({ open, onClose }: Props) {
  return (
    <Dialog open={open} maxWidth="md" onClose={onClose}>
      <Box
        sx={{
          padding: "0 24px",
        }}
      >
        <IconButton onClick={onClose}>
          <Close />
        </IconButton>
      </Box>
      <Box
        component="form"
        autoComplete="off"
        sx={{
          padding: "32px",
        }}
      >
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              name="title"
              required
              multiline
              rows={4}
              fullWidth
              id="firstName"
              label="Tiêu đề"
              autoFocus
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              multiline
              rows={4}
              id="lastName"
              label="Mô tả"
              name="desc"
            />
          </Grid>
          <Grid item xs={6}>
            <NumberFormat
              customInput={TextField}
              thousandSeparator
              label="Giá tối thiểu / đêm"
              //   onValueChange={(values) => setNumberFormatState(values.value)}
              prefix="đ"
              fullWidth
              defaultValue={0}
              variant="outlined"
            />
          </Grid>
          <Grid item xs={6}>
            <NumberFormat
              customInput={TextField}
              thousandSeparator
              label="Phí dọn dẹp"
              //   onValueChange={(values) => setNumberFormatState(values.value)}
              prefix="đ"
              defaultValue={0}
              fullWidth
              variant="outlined"
            />
          </Grid>
          <Grid item xs={3}>
            <TextField
              fullWidth
              defaultValue={0}
              name="guestCount"
              label="Khách"
              type="number"
            />
          </Grid>

          <Grid item xs={3}>
            <TextField
              fullWidth
              defaultValue={0}
              name="guestCount"
              label="Phòng Khách"
              type="number"
            />
          </Grid>

          <Grid item xs={3}>
            <TextField
              fullWidth
              defaultValue={0}
              name="guestCount"
              label="Phòng Ngủ"
              type="number"
            />
          </Grid>

          <Grid item xs={3}>
            <TextField
              fullWidth
              defaultValue={0}
              name="guestCount"
              label="Phòng tắm"
              type="number"
            />
          </Grid>

          {AMENITIES.map((item) => (
            <Grid item xs={6} key={item.label}>
              <FormControlLabel
                control={
                  <Switch
                    style={{
                      marginRight: "4px",
                    }}
                  />
                }
                label={item.label}
                name={item.name}
              />
            </Grid>
          ))}

          <Grid item xs={12}>
            <Stack alignItems="flex-end">
              <Button variant="contained">Lưu</Button>
            </Stack>
          </Grid>
        </Grid>
      </Box>
    </Dialog>
  );
}

export default EditRoomDialog;
