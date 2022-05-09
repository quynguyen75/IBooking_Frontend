import { Box, TextField } from "@mui/material";
import React from "react";

type Props = {};

function CreateTitle({}: Props) {
  return (
    <Box
      sx={{
        padding: "12px 0",
      }}
    >
      <TextField multiline rows={6} fullWidth label="Tiêu đề" />
    </Box>
  );
}

export default CreateTitle;
