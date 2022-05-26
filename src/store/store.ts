import { configureStore } from "@reduxjs/toolkit";
import createRoomReducer from "slice/createRoomSlice";
import notifyBookingReducer from "slice/NotifyBookingSlice";

export const store = configureStore({
  reducer: {
    createRoom: createRoomReducer,
    notifyBooking: notifyBookingReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
