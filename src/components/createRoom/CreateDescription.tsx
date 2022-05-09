import { Box, TextField } from "@mui/material";

type Props = {};

function CreateDescription({}: Props) {
  return (
    <Box
      sx={{
        padding: "12px 0",
      }}
    >
      <TextField multiline rows={6} fullWidth label="Mô tả" />
    </Box>
  );
}

export default CreateDescription;
