import { createAsyncThunk } from "@reduxjs/toolkit";
import SC_API from "../../constants/AppApi";
import { AxiosPromise } from "axios";
import { ChainItemType } from "../../apptypes";

export const ChainItemsListTK = createAsyncThunk(
  "ChainItemsList",
  () => SC_API.ChainItemsAPI.ListChainItems() as AxiosPromise<ChainItemType[]>
);
