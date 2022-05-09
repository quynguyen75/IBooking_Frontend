import {
  Avatar,
  Button,
  Card,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Popover,
  TextField,
  Typography,
} from "@mui/material";
import { Image, Work, BeachAccess } from "@mui/icons-material";

import React, { useEffect, useRef, useState } from "react";

import Destination1 from "../../assets/img/searchDestination1.webp";
import Destination2 from "../../assets/img/searchDestination2.webp";
import Destination3 from "../../assets/img/searchDestination3.webp";

import styles from "./TourSearch.module.css";

type Props = {
  id: number;
  tabActive: number;
};

function TourSearch({ id, tabActive }: Props) {
  const inputRef = useRef<HTMLInputElement | null>(null);

  const isDisplay = id === tabActive;

  useEffect(() => {
    if (isDisplay) {
      inputRef.current?.focus();
    }
  }, [isDisplay]);

  return (
    <>
      <div className="searchBlock__item">
        <button>
          <span className="searchBlock__heading">Địa điểm</span>
          <div>
            <input
              className={styles.inputSeach}
              placeholder="Bạn sắp đi đâu?"
              ref={inputRef}
            />
          </div>
        </button>
      </div>
      {isDisplay && (
        <div className={styles.tourSearchPopover}>
          <List
            className={styles.tourSearchList}
            sx={{ width: "100%", bgcolor: "background.paper" }}
          >
            <ListItem>
              <ListItemAvatar>
                <Avatar src={Destination1}></Avatar>
              </ListItemAvatar>
              <ListItemText primary="Thành phố Đà Lạt" />
            </ListItem>
            <ListItem>
              <ListItemAvatar>
                <Avatar src={Destination2}></Avatar>
              </ListItemAvatar>
              <ListItemText primary="Nha Trang" />
            </ListItem>
            <ListItem>
              <ListItemAvatar>
                <Avatar src={Destination3}></Avatar>
              </ListItemAvatar>
              <ListItemText primary="Thành phố Phan Thiết" />
            </ListItem>
          </List>
        </div>
      )}
    </>
  );
}

export default TourSearch;
