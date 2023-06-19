import { createSlice } from "@reduxjs/toolkit";
import { ToastModes } from "../../enum/ToastModes";

const toastDefaultState = {
  mode: ToastModes.info,
  visibility: false,
  text: "",
  time: 2000,
};

export const ToastSlice = createSlice({
  name: "toast",
  initialState: {
    value: toastDefaultState,
  },
  reducers: {
    showToast: (state, action) => {
      state.value = {
        ...action.payload,
        time: action.payload?.time ? action.payload?.time : 2000,
        visibility: true,
      };
    },
    clearToast: (state) => {
      state.value = toastDefaultState;
    },
  },
});

export const { showToast, clearToast } = ToastSlice.actions;

export default ToastSlice.reducer;
