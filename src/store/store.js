import { configureStore } from "@reduxjs/toolkit";
import ToastSlice from "./slices/ToastSlice";
import UserSlice from "./slices/UserSlice";

export default configureStore({
  reducer: {
    toast: ToastSlice,
    user: UserSlice,
  },
  devTools: process.env.NODE_ENV === "development",
});
