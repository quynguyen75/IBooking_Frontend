import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface CreateRoomState {
  roomType: number;
  address: {
    street: string;
    city: string;
    county: string;
    district: string;
    houseNumber: string;
  };
  count: {
    guest: number;
    bed: number;
    bedroom: number;
    bathroom: number;
    livingroom: number;
  };
  amenities: {
    hasPool: boolean;
    hasGym: boolean;
    hasWifi: boolean;
    hasConditioning: boolean;
    hasKitchen: boolean;
    hasWashingMachine: boolean;
    hasDedicatedWorkspace: boolean;
    acceptPet: boolean;
  };
  imageFiles: File[];
  title: string;
  desc: string;
  nightPrice: number;
  cleanlinessFee: number;
  isDisableButton: boolean;
}

const initialState: CreateRoomState = {
  roomType: 1,
  address: {
    street: "",
    city: "",
    county: "",
    district: "",
    houseNumber: "",
  },
  count: {
    guest: 1,
    bed: 1,
    bedroom: 1,
    bathroom: 0,
    livingroom: 0,
  },
  amenities: {
    hasPool: false,
    hasGym: false,
    hasWifi: false,
    hasConditioning: false,
    hasKitchen: false,
    hasWashingMachine: false,
    hasDedicatedWorkspace: false,
    acceptPet: false,
  },
  imageFiles: [],
  title: "",
  desc: "",
  nightPrice: 0,
  cleanlinessFee: 0,
  isDisableButton: false,
};

export const createRoomSlice = createSlice({
  name: "createRoom",
  initialState,
  reducers: {
    setRoomType: (state, action: PayloadAction<number>) => {
      state.roomType = action.payload;
    },
    setAddress: (
      state,
      action: PayloadAction<{
        street: string;
        city: string;
        county: string;
        district: string;
        houseNumber: string;
      }>
    ) => {
      state.address = action.payload;
    },
    setCount: (
      state,
      action: PayloadAction<{
        guest: number;
        bed: number;
        bedroom: number;
        bathroom: number;
        livingroom: number;
      }>
    ) => {
      state.count = action.payload;
    },
    setAmenities: (
      state,
      action: PayloadAction<{
        hasPool: boolean;
        hasGym: boolean;
        hasWifi: boolean;
        hasConditioning: boolean;
        hasKitchen: boolean;
        hasWashingMachine: boolean;
        hasDedicatedWorkspace: boolean;
        acceptPet: boolean;
      }>
    ) => {
      state.amenities = action.payload;
    },
    setImageFile: (state, action: PayloadAction<File[]>) => {
      state.imageFiles = action.payload;
    },
    setTile: (state, action: PayloadAction<string>) => {
      state.title = action.payload;
    },
    setDesc: (state, action: PayloadAction<string>) => {
      state.desc = action.payload;
    },
    setNightPrice: (state, action: PayloadAction<number>) => {
      state.nightPrice = action.payload;
    },
    setCleanlinessFee: (state, action: PayloadAction<number>) => {
      state.cleanlinessFee = action.payload;
    },
    disableNextButton: (state, action: PayloadAction<boolean>) => {
      state.isDisableButton = action.payload;
    },
  },
});

export const {
  setRoomType,
  setAddress,
  setAmenities,
  setCleanlinessFee,
  setCount,
  setNightPrice,
  setDesc,
  setImageFile,
  setTile,
  disableNextButton,
} = createRoomSlice.actions;

export default createRoomSlice.reducer;
