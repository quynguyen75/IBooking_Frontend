import { Autocomplete, Box, Grid, TextField } from "@mui/material";
import { HERE_APIKEY, HERE_QUERY_URL } from "constant/resource";
import React, { ChangeEvent, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { disableNextButton, setAddress } from "slice/createRoomSlice";
import { RootState } from "store/store";

type Props = {};

function ChoseAddress({}: Props) {
  const searchInputRef = useRef<HTMLInputElement | null>(null);
  const address: any = useSelector(
    (state: RootState) => state.createRoom.address
  );
  const dispatch = useDispatch();
  const [options, setOptions] = useState<any[]>([]);

  const [searchValue, setSearchValue] = useState("");

  const searchChangeHandler = (e: React.SyntheticEvent, value: string) =>
    setSearchValue(value);

  const chooseSuggestionItem = (option: any) => {
    dispatch(
      setAddress({
        street: option.street ?? "",
        city: option.city,
        county: option.county,
        district: option.district ?? "",
        houseNumber: option.houseNumber ?? "",
      })
    );

    setSearchValue(option.label);
  };

  const fieldChangeHandler = (e: ChangeEvent<HTMLInputElement>) =>
    dispatch(
      setAddress({
        ...address,
        [e.target.name]: e.target.value,
      })
    );

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `${HERE_QUERY_URL}?q=${searchValue}&apikey=${HERE_APIKEY}&in=countryCode:VNM
          `
        );

        const data = await response.json();
        setOptions(data.items);
      } catch (error) {
        console.log(error);
      }
    };

    let timeoutId: NodeJS.Timeout;

    if (searchValue) {
      timeoutId = setTimeout(() => {
        fetchData();
      }, 400);
    }

    return () => clearTimeout(timeoutId);
  }, [searchValue]);

  useEffect(() => {
    dispatch(
      disableNextButton(!Object.keys(address).every((key) => address[key]))
    );
  }, [address]);

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
            inputValue={searchValue}
            getOptionLabel={(option) => option.address?.label || ""}
            options={options.slice(0, 5)}
            renderInput={(params) => (
              <TextField {...params} label="Địa điểm chính xác" />
            )}
            onInputChange={searchChangeHandler}
            renderOption={(props, option) => (
              <Box
                component="li"
                key={option.title}
                sx={{ p: 2 }}
                {...props}
                onClick={() => chooseSuggestionItem(option.address)}
              >
                {option.address.label}
              </Box>
            )}
            ref={searchInputRef}
            clearOnBlur={false}
          />
        </Grid>

        <Grid item xs={12}>
          <TextField
            label="Căn hộ / Phòng (Không bắt buộc)"
            variant="outlined"
            fullWidth
            value={address.houseNumber}
            name="houseNumber"
            onChange={fieldChangeHandler}
          />
        </Grid>

        <Grid item xs={12}>
          <TextField
            label="Đường/phố"
            variant="outlined"
            fullWidth
            value={address.street}
            name="street"
            onChange={fieldChangeHandler}
          />
        </Grid>

        <Grid item xs={12}>
          <TextField
            label="Phường/Xã"
            variant="outlined"
            fullWidth
            value={address.district}
            name="district"
            onChange={fieldChangeHandler}
          />
        </Grid>

        <Grid item xs={12}>
          <TextField
            label="Thành phố"
            variant="outlined"
            fullWidth
            value={address.city}
            name="city"
            onChange={fieldChangeHandler}
          />
        </Grid>

        <Grid item xs={12}>
          <TextField
            label="Tỉnh "
            variant="outlined"
            fullWidth
            value={address.county}
            name="county"
            onChange={fieldChangeHandler}
          />
        </Grid>

        <Grid item xs={12}>
          <TextField
            label="Quốc gia"
            defaultValue="Việt Nam"
            variant="outlined"
            fullWidth
            aria-readonly
          />
        </Grid>
      </Grid>
    </Box>
  );
}

export default ChoseAddress;
