import { configureStore } from "@reduxjs/toolkit";
import createRoomReducer from "slice/createRoomSlice";

export const store = configureStore({
  reducer: {
    createRoom: createRoomReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
