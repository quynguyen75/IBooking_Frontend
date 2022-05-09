import {
  Button,
  Card,
  Dialog,
  FormControl,
  Grid,
  Popover,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { DateRange } from "react-date-range";
import { Star } from "@mui/icons-material";
import React, { useState } from "react";
import { yellow } from "@mui/material/colors";

type Props = {};

function RoomDetailCheckStatusMobile({}: Props) {
  return (
    <Card
      style={{
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: "white",
        padding: "16px 24px",
      }}
    >
      <Stack direction="row" justifyContent="space-between" sx={{}}>
        <div>
          <div>
            <span
              style={{
                fontSize: "18px",
                fontWeight: 600,
              }}
            >
              đ 300,000
            </span>
            / đêm
          </div>

          <div>
            <span>20/05/2022 - 22/05/2022</span>
          </div>
        </div>
        <Button variant="contained">Đặt phòng</Button>
      </Stack>
    </Card>
  );
}

function RoomDetailCheckStatusTablet() {
  const [dates, setDates] = useState<any>([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);

  const [isOpenDateDialog, setIsOpenDateDialog] = useState(false);

  const openDateDialog = () => setIsOpenDateDialog(true);
  const closeDateDialog = () => setIsOpenDateDialog(false);

  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(
    null
  );

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  return (
    <Card
      sx={{
        padding: "24px",
      }}
    >
      <Stack
        sx={{
          fontSize: "16px",
          mb: 1,
        }}
        direction="row"
        flexWrap="wrap"
      >
        <div>
          <span
            style={{
              fontSize: "18px",
              fontWeight: 600,
            }}
          >
            đ 300,000
          </span>
          / đêm
        </div>

        <Stack direction="row" alignItems="center" spacing={2}>
          <Stack direction="row" alignItems="center">
            <Star
              style={{
                color: yellow["A700"],
              }}
            />
            45
          </Stack>

          <span>67 đánh giá</span>
        </Stack>
      </Stack>

      <div>
        <div onClick={openDateDialog}>
          <Grid
            container
            style={{
              border: "1px solid rgb(176, 176, 176)",
              borderRadius: "4px",
              cursor: "pointer",
            }}
          >
            <Grid
              item
              xs={6}
              sx={{
                padding: "10px",
              }}
            >
              <div
                style={{
                  fontWeight: 600,
                }}
              >
                Nhận phòng
              </div>
              <span>Thêm ngày</span>
            </Grid>

            <Grid
              item
              xs={6}
              sx={{
                padding: "10px",
                borderLeft: "1px solid rgb(176, 176, 176)",
              }}
            >
              <div
                style={{
                  fontWeight: 600,
                }}
              >
                Trả phòng
              </div>
              <span>Thêm ngày</span>
            </Grid>
          </Grid>
        </div>

        <Button
          style={{
            border: "1px solid rgb(176, 176, 176)",
            borderBottomLeftRadius: "4px",
            borderBottomRightRadius: "4px",
            padding: "10px",
            borderTop: "0px",
            textTransform: "unset",
            display: "block",
            color: "#000",
            fontWeight: "unset",
          }}
          fullWidth
          onClick={handleClick}
        >
          <div
            style={{
              fontWeight: 600,
            }}
          >
            Khách
          </div>
          <span>1 Khách</span>
        </Button>

        <Stack>
          <Button
            sx={{
              padding: "10px 16px",
              mt: 1,
              textAlign: "center",
            }}
            variant="contained"
          >
            Kiểm tra tình trạng phòng
          </Button>
        </Stack>
      </div>

      <Dialog open={isOpenDateDialog} onClose={closeDateDialog}>
        <DateRange
          onChange={(item) => setDates([item.selection])}
          moveRangeOnFirstSelection={false}
          months={2}
          ranges={dates}
          direction="horizontal"
          preventSnapRefocus={true}
          calendarFocus="backwards"
          showDateDisplay={false}
          className="checkStatus__dialog"
        />
      </Dialog>

      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
      >
        <div
          style={{
            minWidth: anchorEl?.clientWidth,
            padding: "16px",
          }}
        >
          <div>
            <FormControl
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                flexDirection: "row",
              }}
            >
              <label htmlFor="guestCount">Số lượng</label>
              <TextField
                type="number"
                id="guestCount"
                InputProps={{
                  inputProps: {
                    max: 20,
                    min: 0,
                    defaultValue: 1,
                  },
                }}
              />
            </FormControl>
          </div>

          <div>
            <FormControl
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                flexDirection: "row",
                mt: 1,
              }}
            >
              <label htmlFor="petCount">Thú cưng</label>
              <TextField
                type="number"
                id="petCount"
                InputProps={{
                  inputProps: {
                    max: 20,
                    min: 0,
                    defaultValue: 0,
                  },
                }}
              />
            </FormControl>
          </div>
        </div>
      </Popover>
    </Card>
  );
}

export { RoomDetailCheckStatusMobile, RoomDetailCheckStatusTablet };
