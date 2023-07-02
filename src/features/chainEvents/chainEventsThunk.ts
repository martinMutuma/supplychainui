import { createAsyncThunk } from "@reduxjs/toolkit";
import SC_API from "../../constants/AppApi";
import { AxiosPromise } from "axios";
import {
  ChainEventCatsType,
  ChainEventSaveType,
  ChainEventStatusType,
  ChainEventType,
} from "../../apptypes";

export const ChainEventsListTK = createAsyncThunk(
  "ChainEventsList",
  () =>
    SC_API.ChainEventsAPI.ListChainEvents() as AxiosPromise<ChainEventType[]>
);
export const ChainItemsEventsListTK = createAsyncThunk(
  "ChainItemsEventsList",
  (itemId: number) => SC_API.ChainEventsAPI.ListChainItemEvents(itemId)
);

export const GetChainEventTK = createAsyncThunk(
  "GetCurrentEvent",
  (Id: Number) => SC_API.ChainEventsAPI.GetSChainEvent(Id)
);

export const SaveChainEventTK = createAsyncThunk(
  "SaveCurrentEvent",
  (supplyChainEvent: ChainEventType | ChainEventSaveType) =>
    SC_API.ChainEventsAPI.SaveSChainEvent(
      supplyChainEvent
    ) as AxiosPromise<ChainEventType>
);

export const DeleteChainEventTK = createAsyncThunk(
  "DeleteCurrentItem",
  (id: number) =>
    SC_API.ChainEventsAPI.DeleteSChainEvent(id) as AxiosPromise<unknown>
);

export const ChainEventsTypesListTK = createAsyncThunk(
  "ChainEventsTypesList",
  () =>
    SC_API.ChainEventsAPI.ListChainEventTypes() as AxiosPromise<
      ChainEventCatsType[]
    >
);
export const ChainEventsStatusListTK = createAsyncThunk(
  "ChainEventsStatusList",
  () =>
    SC_API.ChainEventsAPI.ListChainEventStatuses() as AxiosPromise<
      ChainEventStatusType[]
    >
);

export const GetChainItemLatestEventTK = createAsyncThunk(
  "GetCurrentItemLatestEvent",
  (ItemId: number) => SC_API.ChainEventsAPI.GetChainItemLatestEvent(ItemId)
);
