import { createAsyncThunk } from "@reduxjs/toolkit";
import SC_API from "../../constants/AppApi";
import { AxiosPromise } from "axios";
import { ChainItemType } from "../../apptypes";

export const ChainItemsListTK = createAsyncThunk(
  "ChainItemsList",
  () => SC_API.ChainItemsAPI.ListChainItems() as AxiosPromise<ChainItemType[]>
);

export const GetChainItemTK = createAsyncThunk(
  "CurrentItem",
  (Id: Number) =>
    SC_API.ChainItemsAPI.GetSChainItem(Id) as AxiosPromise<ChainItemType>
);

export const SaveChainItemTK = createAsyncThunk(
  "SaveCurrentItem",
  (supplyChainItem: ChainItemType) =>
    SC_API.ChainItemsAPI.SaveSChainItem(
      supplyChainItem
    ) as AxiosPromise<ChainItemType>
);

export const DeleteChainItemTK = createAsyncThunk(
  "DeleteCurrentItem",
  (id: number) =>
    SC_API.ChainItemsAPI.DeleteSChainItem(id) as AxiosPromise<unknown>
);
