import {
  Autocomplete,
  Box,
  CircularProgress,
  Grid,
  TextField,
} from "@mui/material";
import { GET_DISTRICTS_API, GET_PROVINCES_API } from "constant/resource";
import useFetch from "hooks/useFetch";
import React, { ChangeEvent, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { disableNextButton, setAddress } from "slice/createRoomSlice";
import { RootState } from "store/store";

type Props = {};

function ChoseAddress({}: Props) {
  const address: any = useSelector(
    (state: RootState) => state.createRoom.address
  );

  const dispatch = useDispatch();
  const [addressData, setAddressData] = useState({
    p: 0,
    d: 0,
  });

  const [status, provinces] = useFetch(GET_PROVINCES_API);

  const [districts, setDistricts] = useState([]);
  const [wards, setWards] = useState([]);

  // remove keyword
  const trimAddressData = (data: string) => {
    const REMOVE_KEYWORDS = [
      "Tỉnh",
      "Thành phố",
      // "Quận",
      // "Huyện",
      // "Phường",
      // "Xã",
      // "Thị trấn",
    ];

    const KEYWORD = REMOVE_KEYWORDS.find((k) => data.includes(k));

    if (KEYWORD) {
      return data.split(KEYWORD + " ")[1];
    }
    return data;
  };

  const provinceChangeHandler = (_: any, value: any) => {
    if (value) {
      setAddressData({
        ...addressData,
        p: value.code,
      });

      dispatch(
        setAddress({
          ...address,
          county: trimAddressData(value.name),
        })
      );
    }
  };

  const districtChangeHandler = (_: any, value: any) => {
    if (value) {
      setAddressData({
        ...addressData,
        d: value.code,
      });

      dispatch(
        setAddress({
          ...address,
          city: trimAddressData(value.name),
        })
      );
    }
  };

  const wardChangeHandler = (_: any, value: any) => {
    if (value) {
      dispatch(
        setAddress({
          ...address,
          district: trimAddressData(value.name),
        })
      );
    }
  };

  const streetAndHouseNumberChangeHandler = (
    e: ChangeEvent<HTMLInputElement>
  ) =>
    dispatch(
      setAddress({
        ...address,
        [e.target.name]: e.target.value,
      })
    );

  // get data from api
  const getData = async (url: string, success: (data: any) => any) => {
    try {
      const response = await fetch(url);
      const data = await response.json();
      success(data);
    } catch (error) {
      console.log(error);
    }
  };

  // get Districts
  useEffect(() => {
    if (addressData.p) {
      getData(GET_PROVINCES_API + `/${addressData.p}?depth=2`, (data) =>
        setDistricts(data.districts)
      );
    }
  }, [addressData.p]);

  // get Wards
  useEffect(() => {
    if (addressData.d) {
      getData(GET_DISTRICTS_API + `/${addressData.d}?depth=2`, (data) =>
        setWards(data.wards)
      );
    }
  }, [addressData.d]);

  useEffect(() => {
    dispatch(
      disableNextButton(!Object.keys(address).every((key) => address[key]))
    );

    return () => {
      dispatch(disableNextButton(false));
    };
  }, [address]);

  console.log(address);

  return (
    <Box
      component="form"
      sx={{
        padding: "8px 0",
      }}
    >
      <Grid container spacing={1}>
        <Grid item xs={12}>
          <Autocomplete
            options={provinces as any[]}
            getOptionLabel={(option) => option.name}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Tỉnh / Thành phố"
                InputProps={{
                  ...params.InputProps,
                  endAdornment: (
                    <React.Fragment>
                      {status === "loading" ? (
                        <CircularProgress color="inherit" size={20} />
                      ) : null}
                      {params.InputProps.endAdornment}
                    </React.Fragment>
                  ),
                }}
              />
            )}
            onChange={provinceChangeHandler}
          />
        </Grid>

        <Grid item xs={12}>
          <Autocomplete
            options={districts as any[]}
            getOptionLabel={(option) => option.name}
            renderInput={(params) => (
              <TextField {...params} label="Quận / Huyện" />
            )}
            onChange={districtChangeHandler}
          />
        </Grid>

        <Grid item xs={12}>
          <Autocomplete
            options={wards as any[]}
            getOptionLabel={(option) => option.name}
            renderInput={(params) => (
              <TextField {...params} label="Phường / Xã" />
            )}
            onChange={wardChangeHandler}
          />
        </Grid>

        <Grid item xs={6}>
          <TextField
            fullWidth
            label="Đường"
            name="street"
            onChange={streetAndHouseNumberChangeHandler}
          />
        </Grid>

        <Grid item xs={6}>
          <TextField
            fullWidth
            label="Số nhà"
            name="houseNumber"
            onChange={streetAndHouseNumberChangeHandler}
          />
        </Grid>

        <Grid item xs={12}></Grid>
      </Grid>
    </Box>
  );
}

export default ChoseAddress;
