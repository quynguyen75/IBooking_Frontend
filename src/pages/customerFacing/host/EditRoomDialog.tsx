import {
  Box,
  Button,
  Dialog,
  FormControlLabel,
  Grid,
  IconButton,
  Stack,
  TextField,
} from "@mui/material";
import { Switch } from "@pankod/refine-antd";
import NumberFormat from "react-number-format";
import { AMENITIES, ROOM_API } from "constant/resource";
import { Close } from "@mui/icons-material";
import React, { ChangeEvent, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { moneyStringToNumber } from "utils/money";

type Props = {
  open: boolean;
  onClose: () => void;
  room: any;
  changeRooms: () => void;
};

function EditRoomDialog({ open, onClose, room, changeRooms }: Props) {
  const [roomState, setRoomState] = useState(
    room && {
      ...room,
      nightPrice: moneyStringToNumber(room.nightPrice),
    }
  );

  useEffect(() => {
    setRoomState(
      room && {
        ...room,
        nightPrice: moneyStringToNumber(room.nightPrice),
      }
    );
  }, [room]);

  const dataChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) =>
    setRoomState((data: any) => ({
      ...data,
      [e.target.name]: e.target.value,
    }));

  const nightPriceChangeHandler = (values: any) => {
    setRoomState((data: any) => ({
      ...data,
      nightPrice: +values.value,
    }));
  };

  const cleanlinessFeeChangeHandler = (values: any) => {
    setRoomState((data: any) => ({
      ...data,
      cleanlinessFee: +values.value,
    }));
  };

  const saveHandler = async () => {
    try {
      const response = await fetch(ROOM_API + `/${room.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          data: {
            guestCount: roomState.guestCount,
            bedCount: roomState.bedCount,
            bedRoomCount: roomState.bedRoomCount,
            bathRoomCount: roomState.bathRoomCount,
            livingRoomCount: roomState.livingRoomCount,
            cleanlinessFee: roomState.cleanlinessFee,
            desc: roomState.desc,
            nightPrice: roomState.nightPrice,
            roomType: roomState.roomType.id,
            title: roomState.title,
            hasConditioning: roomState.hasConditioning,
            hasDedicatedWorkspace: roomState.hasDedicatedWorkspace,
            hasGym: roomState.hasGym,
            hasKitchen: roomState.hasKitchen,
            hasPool: roomState.hasPool,
            hasWashingMachine: roomState.hasWashingMachine,
            hasWifi: roomState.hasWifi,
          },
        }),
      });

      if (response.ok) {
        toast.success("Thay ?????i th??nh c??ng");
        changeRooms();
        onClose();
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Dialog open={open} maxWidth="md" onClose={onClose}>
      <Box
        sx={{
          padding: "0 24px",
        }}
      >
        <IconButton onClick={onClose}>
          <Close />
        </IconButton>
      </Box>
      <Box
        component="form"
        autoComplete="off"
        sx={{
          padding: "32px",
        }}
      >
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              name="title"
              required
              multiline
              rows={4}
              fullWidth
              label="Ti??u ?????"
              autoFocus
              value={roomState?.title}
              onChange={dataChangeHandler}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              multiline
              rows={4}
              label="M?? t???"
              name="desc"
              value={roomState?.desc}
              onChange={dataChangeHandler}
            />
          </Grid>
          <Grid item xs={6}>
            <NumberFormat
              customInput={TextField}
              thousandSeparator
              label="Gi?? t???i thi???u / ????m"
              //   onValueChange={(values) => setNumberFormatState(values.value)}
              suffix="??"
              fullWidth
              defaultValue={0}
              variant="outlined"
              value={roomState?.nightPrice}
              onValueChange={nightPriceChangeHandler}
            />
          </Grid>
          <Grid item xs={6}>
            <NumberFormat
              customInput={TextField}
              thousandSeparator
              label="Ph?? d???n d???p"
              //   onValueChange={(values) => setNumberFormatState(values.value)}
              suffix="??"
              defaultValue={0}
              fullWidth
              variant="outlined"
              value={roomState?.cleanlinessFee}
              onValueChange={cleanlinessFeeChangeHandler}
            />
          </Grid>
          <Grid item xs={3}>
            <TextField
              fullWidth
              defaultValue={0}
              name="guestCount"
              label="Kh??ch"
              type="number"
              value={roomState?.guestCount}
              onChange={dataChangeHandler}
            />
          </Grid>

          <Grid item xs={3}>
            <TextField
              fullWidth
              defaultValue={0}
              name="guestCount"
              label="Ph??ng Kh??ch"
              type="number"
              value={roomState?.livingRoomCount}
              onChange={dataChangeHandler}
            />
          </Grid>

          <Grid item xs={3}>
            <TextField
              fullWidth
              defaultValue={0}
              name="guestCount"
              label="Ph??ng Ng???"
              type="number"
              value={roomState?.bedroomCount}
              onChange={dataChangeHandler}
            />
          </Grid>

          <Grid item xs={3}>
            <TextField
              fullWidth
              defaultValue={0}
              name="guestCount"
              label="Ph??ng t???m"
              type="number"
              value={roomState?.bathroomCount}
              onChange={dataChangeHandler}
            />
          </Grid>

          {AMENITIES.map((item) => (
            <Grid item xs={6} key={item.label}>
              <FormControlLabel
                control={
                  <Switch
                    style={{
                      marginRight: "4px",
                    }}
                    checked={roomState && roomState[item.name]}
                    onChange={(checked: boolean) =>
                      setRoomState((data: any) => ({
                        ...data,
                        [item.name]: checked,
                      }))
                    }
                  />
                }
                label={item.label}
                name={item.name}
              />
            </Grid>
          ))}

          <Grid item xs={12}>
            <Stack alignItems="flex-end">
              <Button variant="contained" onClick={saveHandler}>
                L??u
              </Button>
            </Stack>
          </Grid>
        </Grid>
      </Box>
    </Dialog>
  );
}

export default EditRoomDialog;
