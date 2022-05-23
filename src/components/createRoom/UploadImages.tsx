import {
  Box,
  Card,
  IconButton,
  ImageList,
  ImageListItem,
  Stack,
  Typography,
} from "@mui/material";
import { AddPhotoAlternateOutlined, Close } from "@mui/icons-material";
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "store/store";
import { disableNextButton, setImageFile } from "slice/createRoomSlice";

type Props = {};

function UploadImages({}: Props) {
  const files = useSelector((state: RootState) => state.createRoom.imageFiles);

  const dispatch = useDispatch();

  const removeFile = (deletedIndex: number) =>
    dispatch(
      setImageFile(files.filter((item, index) => index !== deletedIndex))
    );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      dispatch(setImageFile([...files, ...Array.from(e.target.files)]));
    }
  };

  useEffect(() => {
    dispatch(disableNextButton(files.length < 5));
  }, [files]);

  console.log(files);

  return (
    <Box
      sx={{
        padding: "12px 0",
      }}
    >
      <label htmlFor="icon-button-file">
        <input
          accept="image/*"
          id="icon-button-file"
          type="file"
          multiple
          hidden
          onChange={handleChange}
        />
        <Card
          sx={{
            padding: "24px 0",
          }}
        >
          <Stack justifyContent="center" alignItems="center">
            <AddPhotoAlternateOutlined
              sx={{
                fontSize: "64px",
              }}
            />
            <Typography variant="h6" fontSize={16}>
              Thêm ít nhất 5 ảnh
            </Typography>
          </Stack>
        </Card>
      </label>

      <ImageList
        cols={1}
        rowHeight={300}
        gap={8}
        sx={{
          p: "12px 0",
        }}
      >
        {files.map((item, index) => (
          <ImageListItem
            key={Date() + item.name}
            sx={{
              position: "relative",
            }}
          >
            <IconButton
              sx={{
                backgroundColor: "#fff",
                position: "absolute",
                top: "12px",
                right: "12px",
              }}
              onClick={() => removeFile(index)}
            >
              <Close />
            </IconButton>
            <img
              src={URL.createObjectURL(item)}
              alt={item.name}
              loading="lazy"
              style={{
                objectFit: "cover",
                width: "100%",
                height: "100%",
              }}
            />
          </ImageListItem>
        ))}
      </ImageList>
    </Box>
  );
}

export default UploadImages;
