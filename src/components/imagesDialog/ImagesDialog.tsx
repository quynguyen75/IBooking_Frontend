import { Close } from "@mui/icons-material";
import {
  Dialog,
  DialogActions,
  DialogContent,
  IconButton,
  ImageList,
  ImageListItem,
} from "@mui/material";
import useDisableScroll from "hooks/useDisableScroll";
import React, { useEffect } from "react";

type Props = {
  open: boolean;
  onClose: () => void;
  images: { label: string; imgPath: string }[];
};

function ImagesDialog({ open, onClose, images }: Props) {
  useDisableScroll(open);

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md">
      <DialogActions onClick={onClose}>
        <IconButton>
          <Close />
        </IconButton>
      </DialogActions>

      <DialogContent>
        <ImageList cols={2} rowHeight={200}>
          {images.map((item) => (
            <ImageListItem key={item.imgPath}>
              <img
                src={`${item.imgPath}?w=164&h=164&fit=crop&auto=format`}
                srcSet={`${item.imgPath}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                alt={item.label}
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
