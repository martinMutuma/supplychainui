import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import loggedInUserReducer from "../features/auth/authSlice";
import chainItemsReducer from "../features/chainItems/chainItemsSlice";

import thunk from "redux-thunk";

export const store = configureStore({
  reducer: {
    loggedInUser: loggedInUserReducer,
    ChainItems: chainItemsReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
