import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface CreateRoomState {
  flag: boolean;
}

const initialState: CreateRoomState = {
  flag: false,
};

export const notifyBookingSlice = createSlice({
  name: "notifyBooking",
  initialState,
  reducers: {
    changeNotify(state) {
      state.flag = !state.flag;
    },
  },
});

export const { changeNotify } = notifyBookingSlice.actions;

export default notifyBookingSlice.reducer;
