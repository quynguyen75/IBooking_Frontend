import { List, ListItem, ListItemButton, Typography } from "@mui/material";
import { ROOM_TYPE_API } from "constant/resource";
import useFetch from "hooks/useFetch";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setRoomType } from "slice/createRoomSlice";
import { RootState } from "store/store";
import { formatDataStrapi } from "utils/data";

type Props = {};

function CreateRoomType({}: Props) {
  const dispatch = useDispatch();
  const [fetchStatus, roomTypes] = useFetch(ROOM_TYPE_API);
  const roomType = useSelector((state: RootState) => state.createRoom.roomType);

  const formatedData = roomTypes && formatDataStrapi(roomTypes);

  const itemClickHandler = (id: number) => {
    dispatch(setRoomType(id));
  };

  console.log(roomType);

  return (
    <List>
      {formatedData &&
        formatedData.data.map((item: any, index: number) => (
          <ListItem key={item.name}>
            <ListItemButton
              sx={{
                border: "1px solid rgb(221, 221, 221)",
                borderRadius: "12px",
                "&.Mui-selected": {
                  borderColor: "#000",
                },
              }}
              selected={item.id === roomType}
              onClick={() => itemClickHandler(item.id)}
            >
              <div>
                <Typography
                  sx={{
                    fontWeight: 600,
                  }}
                >
                  {item.name}
                </Typography>
                <Typography>{item.desc}</Typography>
              </div>
            </ListItemButton>
          </ListItem>
        ))}
    </List>
  );
}

export default CreateRoomType;
