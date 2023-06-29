import { AnyAction, createSlice } from "@reduxjs/toolkit";
import { UserListStateType } from "../../apptypes";
import {
  isFulfilledAction,
  isPendingAction,
  isRejectedAction,
} from "../../app/utils";

import { GetUserListTK } from "./authThunk";

const initialState: UserListStateType = {
  UserList: [],
  loading: false,
  error: null,
};

const chainUserListSlice = createSlice({
  name: "UserList",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(GetUserListTK.fulfilled, (state, action: AnyAction) => {
        return { ...state, UserList: [...action.payload] };
      })
      .addMatcher(isPendingAction, (state) => {
        state.loading = true;
      })
      .addMatcher(isFulfilledAction, (state) => {
        state.loading = false;
        state.error = "";
      })
      .addMatcher(isRejectedAction, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "";
      });
  },
});

export const {} = chainUserListSlice.actions;

export default chainUserListSlice.reducer;
