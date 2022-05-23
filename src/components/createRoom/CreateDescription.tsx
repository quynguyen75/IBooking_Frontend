import { Box, TextField } from "@mui/material";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { disableNextButton, setDesc } from "slice/createRoomSlice";
import { RootState } from "store/store";

type Props = {};

function CreateDescription({}: Props) {
  const desc = useSelector((state: RootState) => state.createRoom.desc);

  const dispatch = useDispatch();

  const descChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) =>
    dispatch(setDesc(e.target.value));

  useEffect(() => {
    dispatch(disableNextButton(desc.length === 0));
  }, [desc]);

  return (
    <Box
      sx={{
        padding: "12px 0",
      }}
    >
      <TextField
        multiline
        rows={6}
        fullWidth
        label="Mô tả"
        value={desc}
        onChange={descChangeHandler}
      />
    </Box>
  );
}

export default CreateDescription;
