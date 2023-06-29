import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import loggedInUserReducer from "../features/auth/authSlice";
import chainItemsReducer from "../features/chainItems/chainItemsSlice";
import chainEventsReducer from "../features/chainEvents/chainEventsSlice";
import UserListReducer from "../features/auth/userListSlice";
import EventTypesListReducer from "../features/chainEvents/chainEventsTypesSlice";
import EventStatusListReducer from "../features/chainEvents/chainEventsStatusSlice";
import thunk from "redux-thunk";

export const store = configureStore({
  reducer: {
    loggedInUser: loggedInUserReducer,
    ChainItems: chainItemsReducer,
    ChainEvents: chainEventsReducer,
    UserList: UserListReducer,
    EventTypesList: EventTypesListReducer,
    EventStatusList: EventStatusListReducer,
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
