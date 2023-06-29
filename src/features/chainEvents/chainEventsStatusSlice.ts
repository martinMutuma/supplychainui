import { AnyAction, createSlice } from "@reduxjs/toolkit";
import { ChainEventStatusListStateType } from "../../apptypes";
import {
  isFulfilledAction,
  isPendingAction,
  isRejectedAction,
} from "../../app/utils";

import { ChainEventsStatusListTK } from "./chainEventsThunk";

const initialState: ChainEventStatusListStateType = {
  EventStatusList: [],
  loading: false,
  error: null,
};

const chainEventTypesListSlice = createSlice({
  name: "EventTypesList",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(
        ChainEventsStatusListTK.fulfilled,
        (state, action: AnyAction) => {
          return { ...state, EventStatusList: [...action.payload] };
        }
      )
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

export const {} = chainEventTypesListSlice.actions;

export default chainEventTypesListSlice.reducer;
