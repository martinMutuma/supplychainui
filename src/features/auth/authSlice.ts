import { AnyAction, createSlice } from "@reduxjs/toolkit";
import { LoggedUserStateType, LoggedUserType } from "../../apptypes";
import { LoginCurrentUserTK } from "./authThunk";
import {
  isFulfilledAction,
  isPendingAction,
  isRejectedAction,
} from "../../app/utils";
import { userAccessTokenKey } from "../../constants/AppApi";
import { useLocalStorage } from "../../hooks/useLocaStorange";

const initialState: LoggedUserStateType = {
  id: 0,
  email: "",
  isLoggedIn: false,
  loading: false,
  error: null,
};

const userLoginSlice = createSlice({
  name: "loggedInUser",
  initialState,
  reducers: {
    IsUserLoggeIn: (state) => {
      const isLoggedIn = state.username && state.access ? true : false;

      return { ...state, isLoggedIn };
    },
    LogoutCurrentUser: (state) => {
      state = { ...initialState };
      return state;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(LoginCurrentUserTK.fulfilled, (state, action: AnyAction) => {
        const loggedUserData: LoggedUserType = {
          ...(action.payload as LoggedUserType),
        };
        if (loggedUserData.access) {
          useLocalStorage().setItem(userAccessTokenKey, loggedUserData.access);
          state = { ...state, ...loggedUserData, isLoggedIn: true };
        } else {
          useLocalStorage().removeItem(userAccessTokenKey);
          state = { ...state, ...loggedUserData, isLoggedIn: false };
        }
        return state;
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

export const { IsUserLoggeIn, LogoutCurrentUser } = userLoginSlice.actions;

export default userLoginSlice.reducer;
