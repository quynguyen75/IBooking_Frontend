import { ChevronLeft, LocationOn } from "@mui/icons-material";

import {
  Avatar,
  Dialog,
  Divider,
  Grid,
  IconButton,
  Input,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
} from "@mui/material";

import { useEffect } from "react";

import styles from "./SearchDialog.module.css";

type Props = {
  isOpenSearchMobile: boolean;
  closeSearchMobile: () => void;
};

function SearchDialog({ isOpenSearchMobile, closeSearchMobile }: Props) {
  useEffect(() => {
    if (isOpenSearchMobile) {
      document.body.classList.add("disableScroll");
    }

    return () => document.body.classList.remove("disableScroll");
  }, [isOpenSearchMobile]);

  return (
    <Dialog
      fullScreen
      open={isOpenSearchMobile}
      onClose={closeSearchMobile}
      className={styles.searchDialog}
    >
      <div
        style={{
          padding: "16px 0",
        }}
      >
        <Grid
          container
          alignItems="center"
          spacing={2}
          className={styles["dialog__top"]}
        >
          <Grid item xs={1}>
            <IconButton
              edge="start"
              color="inherit"
              onClick={closeSearchMobile}
              aria-label="close"
            >
              <ChevronLeft />
            </IconButton>
          </Grid>

          <Grid item xs={11}>
            <Input
              placeholder="Bạn sắp đi đâu?"
              autoFocus
              className={styles.dialogInput}
            />
          </Grid>
        </Grid>
        <List className={styles["dialog__list"]}>
          <ListItem button>
            <ListItemAvatar>
              <Avatar>
                <LocationOn />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary="Thành phố Đà Lạt" />
          </ListItem>

          <ListItem button>
            <ListItemAvatar>
              <Avatar>
                <LocationOn />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary="Thành phố Hồ Chí Minh" />
          </ListItem>

          <ListItem button>
            <ListItemAvatar>
              <Avatar>
                <LocationOn />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary="Thành phố Bến Tre" />
          </ListItem>
        </List>
      </div>
    </Dialog>
  );
}

export default SearchDialog;
