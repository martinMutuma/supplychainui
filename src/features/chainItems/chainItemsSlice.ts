import { AnyAction, createSlice } from "@reduxjs/toolkit";
import {
  ChainItemTypeListStateType,
  LoggedUserStateType,
  LoggedUserType,
} from "../../apptypes";
import {
  isFulfilledAction,
  isPendingAction,
  isRejectedAction,
} from "../../app/utils";
import { userAccessTokenKey } from "../../constants/AppApi";
import { useLocalStorage } from "../../hooks/useLocaStorange";
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
      .addMatcher(isPendingAction, (state, action) => {
        state.loading = true;
      })
      .addMatcher(isFulfilledAction, (state, action) => {
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
