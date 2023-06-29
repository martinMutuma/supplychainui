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
  CurrentEditItem: null,
  CurrentDeleteItem: null,
};

const chainItemsSlice = createSlice({
  name: "ChainItems",
  initialState,
  reducers: {
    SetCurrentSupplyChainItem: (state, action) => {
      return { ...state, CurrentEditItem: action.payload };
    },
    SetCurrentSupplyDeleteChainItem: (state, action) => {
      return { ...state, CurrentDeleteItem: action.payload };
    },
    LazyUpdateCurrentEditedItem: (state, action) => {
      if (action && action?.payload?.id) {
        const undEditedItems = state.chainItemsList.filter(
          (x) => x.id != action.payload.id
        );
        return {
          ...state,
          chainItemsList: [...undEditedItems, action.payload],
        };
      }
      return state;
    },
    LazyUpdateCurrentDeletedItem: (state, action) => {
      if (action && action?.payload?.id) {
        const undEditedItems = state.chainItemsList.filter(
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

export const {
  SetCurrentSupplyChainItem,
  LazyUpdateCurrentEditedItem,
  LazyUpdateCurrentDeletedItem,
  SetCurrentSupplyDeleteChainItem,
} = chainItemsSlice.actions;

export default chainItemsSlice.reducer;
