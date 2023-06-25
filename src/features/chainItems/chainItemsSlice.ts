import { AnyAction, createSlice } from "@reduxjs/toolkit";
import { ChainItemTypeListStateType } from "../../apptypes";
import {
  isFulfilledAction,
  isPendingAction,
  isRejectedAction,
} from "../../app/utils";

import { ChainItemsListTK } from "./chainItemsThunk";

const initialState: ChainItemTypeListStateType = {
  chainItemsList: [],
  loading: false,
  error: null,
  CurrentItem: null,
};

const chainItemsSlice = createSlice({
  name: "ChainItems",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(ChainItemsListTK.fulfilled, (state, action: AnyAction) => {
        return { ...state, chainItemsList: [...action.payload] };
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

// export const { IsUserLoggeIn, LogoutCurrentUser } = chainItemsSlice.actions;

export default chainItemsSlice.reducer;
