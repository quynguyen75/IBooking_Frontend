import { Close } from "@mui/icons-material";
import {
  Dialog,
  DialogActions,
  DialogContent,
  IconButton,
  ImageList,
  ImageListItem,
  useMediaQuery,
} from "@mui/material";
import useDisableScroll from "hooks/useDisableScroll";
import React, { useEffect } from "react";

type Props = {
  open: boolean;
  onClose: () => void;
  images: any[];
};

function ImagesDialog({ open, onClose, images }: Props) {
  useDisableScroll(open);
  const min768px = useMediaQuery("(min-width: 768px)");

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md">
      <DialogActions onClick={onClose}>
        <IconButton>
          <Close />
        </IconButton>
      </DialogActions>

      <DialogContent>
        <ImageList cols={2} rowHeight={min768px ? 300 : 200}>
          {images.map((item) => (
            <ImageListItem key={item.imgPath}>
              <img
                src={`${item.url}`}
                srcSet={`${item.url}`}
                alt={item.alternativeText}
                loading="lazy"
              />
            </ImageListItem>
          ))}
        </ImageList>
      </DialogContent>
    </Dialog>
  );
}

export default ImagesDialog;
