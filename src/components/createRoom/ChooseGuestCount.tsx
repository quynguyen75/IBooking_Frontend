import { Box, Grid, Stack, TextField } from "@mui/material";
import React from "react";

type Props = {};

function ChooseGuestCount({}: Props) {
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
          </Stack>
        </Grid>

        <Grid item xs={12}>
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
          >
            <label htmlFor="guestCount">Giường</label>
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
          </Stack>
        </Grid>

        <Grid item xs={12}>
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
          >
            <label htmlFor="guestCount">Phòng ngủ</label>
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
          </Stack>
        </Grid>

        <Grid item xs={12}>
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
          >
            <label htmlFor="guestCount">Phòng tắm</label>
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
          </Stack>
        </Grid>
      </Grid>
    </Box>
  );
}

export default ChooseGuestCount;
