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
import { HERE_APIKEY, HERE_QUERY_URL } from "constant/resource";

type Props = {
  id: number;
  tabActive: number;
  tourSearch: any;
  dispatch: React.Dispatch<any>;
};

const SUGGESTION_COUNT = 5;

function TourSearch({ id, tabActive, tourSearch, dispatch }: Props) {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [inputValue, setInputValue] = useState("");
  const [suggestion, setSuggestion] = useState<any[]>([]);

  const isDisplay = id === tabActive;

  const inputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  // focus when tab active
  useEffect(() => {
    if (isDisplay) {
      inputRef.current?.focus();
    }
  }, [isDisplay]);

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
    if (tourSearch) {
      inputRef.current && (inputRef.current.value = tourSearch.label);
    }
  }, [tourSearch]);

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
              onChange={inputChangeHandler}
              style={{
                maxWidth: "80%",
              }}
            />
          </div>
        </button>
      </div>
      {isDisplay && suggestion.length > 0 && (
        <div className={styles.tourSearchPopover}>
          <List
            className={styles.tourSearchList}
            sx={{ width: "100%", bgcolor: "background.paper" }}
          >
            {suggestion.length > 0 &&
              suggestion.slice(0, SUGGESTION_COUNT).map((item) => (
                <ListItem
                  key={item.title}
                  onClick={() =>
                    dispatch({
                      type: "TOURSEARCH",
                      payload: item.address,
                    })
                  }
                >
                  <ListItemAvatar>
                    <Avatar src={Destination1}></Avatar>
                  </ListItemAvatar>
                  <ListItemText primary={item.title} />
                </ListItem>
              ))}
          </List>
        </div>
      )}
    </>
  );
}

export default TourSearch;
