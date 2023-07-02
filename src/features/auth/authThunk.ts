import { createAsyncThunk } from "@reduxjs/toolkit";
import SC_API from "../../constants/AppApi";
import { LoggedUserType, LoginUserDataType } from "../../apptypes";
import { AxiosPromise } from "axios";

export const LoginCurrentUserTK = createAsyncThunk(
  "LoginCurrentUser",
  (userData: LoginUserDataType) =>
    SC_API.Auth_API.LoginUser(userData) as AxiosPromise<LoggedUserType>
);

export const GetUserListTK = createAsyncThunk("UserList", () =>
  SC_API.Auth_API.ListUsers()
);
