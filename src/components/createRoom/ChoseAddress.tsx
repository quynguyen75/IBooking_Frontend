import { Box, FormControl, Grid, TextField } from "@mui/material";
import React from "react";

type Props = {};

function ChoseAddress({}: Props) {
  return (
    <Box
      component="form"
      sx={{
        padding: "8px 0",
      }}
    >
      <Grid container spacing={1}>
        <Grid item xs={12}>
          <TextField label="Đường/phố" variant="outlined" fullWidth />
        </Grid>

        <Grid item xs={12}>
          <TextField
            label="Căn hộ / Phòng (Không bắt buộc)"
            variant="outlined"
            fullWidth
          />
        </Grid>

        <Grid item xs={12}>
          <TextField label="Thành phố" variant="outlined" fullWidth />
        </Grid>

        <Grid item xs={12}>
          <TextField label="Tỉnh " variant="outlined" fullWidth />
        </Grid>

        <Grid item xs={12}>
          <TextField
            label="Quốc gia"
            defaultValue="Việt Nam"
            variant="outlined"
            fullWidth
          />
        </Grid>
      </Grid>
    </Box>
  );
}

export default ChoseAddress;
