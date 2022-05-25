import { CircularProgress, Dialog, Stack } from "@mui/material";
import React from "react";

type Props = {};

function Loading({}: Props) {
  return (
    <Dialog
      open={true}
      fullScreen
      sx={{
        opacity: 0.8,
      }}
    >
      <Stack alignItems="center" justifyContent="center" height="100vh">
        <CircularProgress />
      </Stack>
    </Dialog>
  );
}

export default Loading;
