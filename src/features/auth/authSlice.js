import { createSlice } from "@reduxjs/toolkit";
import apiSlice from "../api/apiSlice";

const initialState = {
  user: null,
  token: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: () => initialState,
    setUser: (state, action) => {
      state.token = action.payload.token;
      state.user = action.payload.user;
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(apiSlice.endpoints.login.matchFulfilled, (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
    });
  },
});

export const { logout, setUser } = authSlice.actions;

export default authSlice.reducer;
