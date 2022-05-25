import { Box, TextField } from "@mui/material";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { disableNextButton, setTile } from "slice/createRoomSlice";
import { RootState } from "store/store";

type Props = {};

function CreateTitle({}: Props) {
  const title = useSelector((state: RootState) => state.createRoom.title);

  const dispatch = useDispatch();

  const titleChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) =>
    dispatch(setTile(e.target.value));

  useEffect(() => {
    dispatch(disableNextButton(title.trim().length === 0));

    return () => {
      dispatch(disableNextButton(false));
    };
  }, [title]);

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
        label="Tiêu đề"
        onChange={titleChangeHandler}
        value={title}
      />
    </Box>
  );
}

export default CreateTitle;
