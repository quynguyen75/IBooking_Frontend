import { Box, Grid, Stack, TextField } from "@mui/material";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCount } from "slice/createRoomSlice";
import { RootState } from "store/store";

type Props = {};

function ChooseGuestCount({}: Props) {
  const roomCount = useSelector((state: RootState) => state.createRoom.count);

  const dispatch = useDispatch();

  const fieldChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) =>
    dispatch(
      setCount({
        ...roomCount,
        [e.target.name]: +e.target.value,
      })
    );

  return (
    <Box
      component="form"
      sx={{
        padding: "8px 0",
      }}
    >
      <Grid container spacing={1}>
        <Grid item xs={12}>
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
          >
            <label htmlFor="guestCount">Khách</label>
            <TextField
              onChange={fieldChangeHandler}
              type="number"
              id="guestCount"
              name="guest"
              InputProps={{
                inputProps: {
                  max: 20,
                  min: 0,
                },
              }}
              value={roomCount.guest}
            />
          </Stack>
        </Grid>

        <Grid item xs={12}>
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
          >
            <label htmlFor="bed">Giường</label>
            <TextField
              onChange={fieldChangeHandler}
              type="number"
              id="bed"
              name="bed"
              value={roomCount.bed}
              InputProps={{
                inputProps: {
                  max: 20,
                  min: 0,
                },
              }}
            />
          </Stack>
        </Grid>

        <Grid item xs={12}>
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
          >
            <label htmlFor="bedroom">Phòng ngủ</label>
            <TextField
              onChange={fieldChangeHandler}
              type="number"
              id="bedroom"
              name="bedroom"
              value={roomCount.bedroom}
              InputProps={{
                inputProps: {
                  max: 20,
                  min: 0,
                },
              }}
            />
          </Stack>
        </Grid>

        <Grid item xs={12}>
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
          >
            <label htmlFor="bathroom">Phòng tắm</label>
            <TextField
              onChange={fieldChangeHandler}
              type="number"
              id="bathroom"
              name="bathroom"
              value={roomCount.bathroom}
              InputProps={{
                inputProps: {
                  max: 20,
                  min: 0,
                },
              }}
            />
          </Stack>
        </Grid>

        <Grid item xs={12}>
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
          >
            <label htmlFor="livingroom">Phòng khách</label>
            <TextField
              onChange={fieldChangeHandler}
              type="number"
              id="livingroom"
              name="livingroom"
              value={roomCount.livingroom}
              InputProps={{
                inputProps: {
                  max: 20,
                  min: 0,
                },
              }}
            />
          </Stack>
        </Grid>
      </Grid>
    </Box>
  );
}

export default ChooseGuestCount;
