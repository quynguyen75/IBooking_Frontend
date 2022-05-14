import { Close } from "@mui/icons-material";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  Divider,
  Grid,
  IconButton,
  Typography,
} from "@mui/material";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  children: any;
  title: string;
  buttonAction: JSX.Element;
};

function RoomFilterDialog({
  isOpen,
  onClose,
  children,
  title,
  buttonAction,
}: Props) {
  return (
    <div>
      <Dialog open={isOpen} onClose={onClose} fullWidth scroll="paper">
        <div
          style={{
            padding: "8px 0",
          }}
        >
          <Grid
            container
            alignItems="center"
            spacing={2}
            direction="row"
            className="dialog__top"
          >
            <Grid item xs={1}>
              <IconButton
                edge="start"
                color="inherit"
                onClick={onClose}
                aria-label="close"
              >
                <Close />
              </IconButton>
            </Grid>

            <Grid item xs={11}>
              <Typography variant="h6" textAlign="center">
                {title}
              </Typography>
            </Grid>
          </Grid>
        </div>

        <Divider />

        <DialogContent>{children}</DialogContent>
        <Divider />
        <DialogActions>{buttonAction}</DialogActions>
      </Dialog>
    </div>
  );
}

export default RoomFilterDialog;
