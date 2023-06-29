import { AnyAction, createSlice } from "@reduxjs/toolkit";
import { ChainEventCatsListStateType } from "../../apptypes";
import {
  isFulfilledAction,
  isPendingAction,
  isRejectedAction,
} from "../../app/utils";

import { ChainEventsTypesListTK } from "./chainEventsThunk";

const initialState: ChainEventCatsListStateType = {
  EventTypesList: [],
  loading: false,
  error: null,
};

const chainEventTypesListSlice = createSlice({
  name: "EventTypesList",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(ChainEventsTypesListTK.fulfilled, (state, action: AnyAction) => {
        return { ...state, EventTypesList: [...action.payload] };
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

export const {} = chainEventTypesListSlice.actions;

export default chainEventTypesListSlice.reducer;
