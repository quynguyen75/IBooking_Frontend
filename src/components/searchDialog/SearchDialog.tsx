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
import { HERE_APIKEY, HERE_QUERY_URL } from "constant/resource";

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { objectToURLParams } from "utils/search";

import styles from "./SearchDialog.module.css";

type Props = {
  isOpenSearchMobile: boolean;
  closeSearchMobile: () => void;
};

function SearchDialog({ isOpenSearchMobile, closeSearchMobile }: Props) {
  const [inputValue, setInputValue] = useState("");
  const [suggestion, setSuggestion] = useState<any[]>([]);

  const inputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  // suggestion text
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `${HERE_QUERY_URL}?q=${inputValue}&apikey=${HERE_APIKEY}&in=countryCode:VNM
          `
        );

        const data = await response.json();
        setSuggestion(data.items);
      } catch (error) {
        console.log(error);
      }
    };

    let timeoutId: NodeJS.Timeout;

    if (inputValue) {
      timeoutId = setTimeout(() => {
        fetchData();
      }, 400);
    }

    return () => clearTimeout(timeoutId);
  }, [inputValue]);

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
              onChange={inputChangeHandler}
            />
          </Grid>
        </Grid>
        <List className={styles["dialog__list"]}>
          {suggestion.slice(0, 5).map((item) => (
            <Link
              to={`/search?${objectToURLParams(item.address)}`}
              style={{ color: "#222" }}
            >
              <ListItem button key={item.address.label}>
                <ListItemAvatar>
                  <Avatar>
                    <LocationOn />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText primary={item.address.label} />
              </ListItem>
            </Link>
          ))}
        </List>
      </div>
    </Dialog>
  );
}

export default SearchDialog;
