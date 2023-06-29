import { AnyAction, createSlice } from "@reduxjs/toolkit";
import { ChainEventTypeListStateType } from "../../apptypes";
import {
  isFulfilledAction,
  isPendingAction,
  isRejectedAction,
} from "../../app/utils";

import { ChainEventsListTK, ChainItemsEventsListTK } from "./chainEventsThunk";

const initialState: ChainEventTypeListStateType = {
  SupplyChainIItem: null,
  chainIEventList: [],
  loading: false,
  error: null,
  CurrentEditChainEvent: null,
  CurrentDeleteChainEvent: null,
};

const chainEventsSlice = createSlice({
  name: "ChainEvents",
  initialState,
  reducers: {
    SetCurrentSupplyChainEditChainEvent: (state, action) => {
      return { ...state, CurrentEditChainEvent: action.payload };
    },
    SetCurrentEventsSupplyChainIItem: (state, action) => {
      return { ...state, SupplyChainIItem: action.payload };
    },
    SetCurrentSupplyDeleteChainEvent: (state, action) => {
      return { ...state, CurrentDeleteChainEvent: action.payload };
    },
    LazyUpdateCurrentEditedChainEvent: (state, action) => {
      if (action && action?.payload?.id) {
        const undEditedItems = state.chainIEventList.filter(
          (x) => x.id != action.payload.id
        );
        return {
          ...state,
          chainItemsList: [...undEditedItems, action.payload],
        };
      }
      return state;
    },
    LazyUpdateCurrentDeletedChainEvent: (state, action) => {
      if (action && action?.payload?.id) {
        const undEditedItems = state.chainIEventList.filter(
          (x) => x.id != action.payload.id
        );
        return {
          ...state,
          chainItemsList: [...undEditedItems],
        };
      }
      return state;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(ChainEventsListTK.fulfilled, (state, action: AnyAction) => {
        return { ...state, chainIEventList: [...action.payload] };
      })
      .addCase(ChainItemsEventsListTK.fulfilled, (state, action: AnyAction) => {
        return { ...state, chainIEventList: [...action.payload] };
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

export const {
  SetCurrentSupplyDeleteChainEvent,
  SetCurrentSupplyChainEditChainEvent,
  LazyUpdateCurrentDeletedChainEvent,
  LazyUpdateCurrentEditedChainEvent,
  SetCurrentEventsSupplyChainIItem,
} = chainEventsSlice.actions;

export default chainEventsSlice.reducer;
