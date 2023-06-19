import { createSlice } from "@reduxjs/toolkit";

const defaultState = {};

export const UserSlice = createSlice({
  name: "user",
  initialState: {
    value: defaultState,
  },
  reducers: {
    setUser: (state, action) => {
      state.value = action.payload;
    },
    clearUser: (state) => {
      state.value = defaultState;
    },
  },
});

export const { setUser, clearUser } = UserSlice.actions;

export default UserSlice.reducer;
