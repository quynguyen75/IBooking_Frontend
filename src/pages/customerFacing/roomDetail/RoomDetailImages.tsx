import {
  Box,
  Button,
  ImageList,
  ImageListItem,
  useMediaQuery,
} from "@mui/material";
import { GridView } from "@mui/icons-material";
import React, { useState } from "react";
import ImageSwipe from "components/imageSwipe/ImageSwipe";
import useDialog from "hooks/useDialog";
import ImagesDialog from "components/imagesDialog/ImagesDialog";

type Props = {
  images: any[];
};

function RoomDetailImages({ images }: Props) {
  const min768px = useMediaQuery("(min-width: 768px)");
  const {
    isOpen: isOpenImagesDialog,
    open: openImagesDialog,
    close: closeImagesDialog,
  } = useDialog();

  console.log(images);

  return (
    <Box
      sx={{
        position: "relative",
      }}
    >
      {min768px || (
        <ImageSwipe
          images={images}
          isOpenDialog={isOpenImagesDialog}
          openDialog={openImagesDialog}
          closeDialog={closeImagesDialog}
        />
      )}

      {min768px && (
        <>
          <ImageList variant="quilted" cols={4} rowHeight={170}>
            {images.slice(0, 5).map((image, index) => (
              <ImageListItem
                key={image.id}
                cols={index === 0 ? 2 : 1}
                rows={index === 0 ? 2 : 1}
              >
                <img
                  src={image.url}
                  alt={image.alternativeText}
                  loading="lazy"
                />
              </ImageListItem>
            ))}
          </ImageList>

          <Button
            variant="outlined"
            sx={{
              position: "absolute",
              right: "24px",
              bottom: "24px",
              backgroundColor: "#fff",
            }}
            onClick={openImagesDialog}
          >
            <GridView
              sx={{
                mr: "4px",
              }}
            />
            Hiển thị tất cả ảnh
          </Button>
        </>
      )}

      <ImagesDialog
        open={isOpenImagesDialog}
        onClose={closeImagesDialog}
        images={images}
      />
    </Box>
  );
}

export default RoomDetailImages;
