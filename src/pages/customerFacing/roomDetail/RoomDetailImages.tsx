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

type Props = {};

const images = [
  {
    label: "San Francisco – Oakland Bay Bridge, United States",
    imgPath:
      "https://images.unsplash.com/photo-1537944434965-cf4679d1a598?auto=format&fit=crop&w=400&h=250&q=60",
  },
  {
    label: "Bird",
    imgPath:
      "https://images.unsplash.com/photo-1538032746644-0212e812a9e7?auto=format&fit=crop&w=400&h=250&q=60",
  },
  {
    label: "Bali, Indonesia",
    imgPath:
      "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=400&h=250&q=80",
  },
  {
    label: "Goč, Serbia",
    imgPath:
      "https://images.unsplash.com/photo-1512341689857-198e7e2f3ca8?auto=format&fit=crop&w=400&h=250&q=60",
  },
  // {
  //   imgPath: "https://images.unsplash.com/photo-1551782450-a2132b4ba21d",
  //   label: "Burger",
  // },
];

function RoomDetailImages({}: Props) {
  const min768px = useMediaQuery("(min-width: 768px)");
  const {
    isOpen: isOpenImagesDialog,
    open: openImagesDialog,
    close: closeImagesDialog,
  } = useDialog();

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
                key={image.label}
                cols={index === 0 ? 2 : 1}
                rows={index === 0 ? 2 : 1}
              >
                <img src={image.imgPath} alt={image.label} loading="lazy" />
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
