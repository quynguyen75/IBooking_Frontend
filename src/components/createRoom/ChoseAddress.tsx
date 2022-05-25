import {
  Autocomplete,
  Box,
  Card,
  Grid,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Popover,
  TextField,
  Typography,
} from "@mui/material";
import { HERE_APIKEY, HERE_QUERY_URL } from "constant/resource";
import React, {
  ChangeEvent,
  FocusEventHandler,
  MouseEventHandler,
  useEffect,
  useRef,
  useState,
} from "react";
import { useDispatch, useSelector } from "react-redux";
import { disableNextButton, setAddress } from "slice/createRoomSlice";
import { RootState } from "store/store";

type Props = {};

function ChoseAddress({}: Props) {
  const address: any = useSelector(
    (state: RootState) => state.createRoom.address
  );

  const dispatch = useDispatch();
  const [isOpenAddressDetail, setIsOpenAddressDetail] = useState(false);
  const [options, setOptions] = useState<any[]>([]);

  const [searchValue, setSearchValue] = useState("");

  const inputRef = useRef<HTMLInputElement | null>(null);
  const cardRef = useRef<HTMLDivElement | null>(null);

  const searchChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) =>
    setSearchValue(e.target.value);

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
    setIsOpenAddressDetail(false);
  };

  const fieldChangeHandler = (e: ChangeEvent<HTMLInputElement>) =>
    dispatch(
      setAddress({
        ...address,
        [e.target.name]: e.target.value,
      })
    );

  const focusInputHandler = () => setIsOpenAddressDetail(true);

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

    return () => {
      dispatch(disableNextButton(false));
    };
  }, [address]);

  //handle click outside
  useEffect(() => {
    const clickOutsideSearchHandler = (e: any) => {
      if (
        inputRef.current &&
        !inputRef.current.contains(e.target) &&
        cardRef.current &&
        !cardRef.current.contains(e.target)
      ) {
        setIsOpenAddressDetail(false);
      }
    };

    document.addEventListener("click", clickOutsideSearchHandler);

    return () =>
      document.removeEventListener("click", clickOutsideSearchHandler);
  }, []);

  return (
    <Box
      component="form"
      sx={{
        padding: "8px 0",
      }}
    >
      <Grid container spacing={1}>
        <Grid
          item
          xs={12}
          sx={{
            position: "relative",
          }}
        >
          <TextField
            value={searchValue}
            label="Địa chỉ chính xác"
            variant="outlined"
            fullWidth
            onChange={searchChangeHandler}
            onFocus={focusInputHandler}
            inputRef={inputRef}
          />

          {isOpenAddressDetail && (
            <Card
              sx={{
                position: "absolute",
                left: 8,
                right: 0,
                backgroundColor: "white",
                top: "100%",
                zIndex: 2,
              }}
              ref={cardRef}
            >
              <List>
                {options.slice(0, 6).map((option) => (
                  <ListItem key={option.address.label}>
                    <ListItemButton
                      onClick={() => chooseSuggestionItem(option.address)}
                    >
                      <ListItemText>{option.address.label}</ListItemText>
                    </ListItemButton>
                  </ListItem>
                ))}
              </List>
            </Card>
          )}
        </Grid>

        <Grid item xs={12}>
          <TextField
            label="Số nhà/căn hộ"
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
