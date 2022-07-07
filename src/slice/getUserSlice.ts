import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface GetUserState {
  flag: boolean;
}

const initialState: GetUserState = {
  flag: false,
};

export const getUserSlice = createSlice({
  name: "getUser",
  initialState,
  reducers: {
    updateUser(state) {
      state.flag = !state.flag;
    },
  },
});

export const { updateUser } = getUserSlice.actions;

export default getUserSlice.reducer;
