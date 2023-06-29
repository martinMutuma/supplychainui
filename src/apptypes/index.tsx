import { ReactElement, ReactPortal } from "react";

export type ChildrenType = { children?: ReactElement | ReactElement[] };

export type UserType = { email: string; username?: string; id?: number };

export type LoggedUserType = UserType & {
  access?: string;
  refresh?: string;
  isLoggedIn: boolean;
};

export type StateStatusType = { loading: boolean; error: string | null };

export type UserListStateType = {
  UserList: UserType[];
} & StateStatusType;

export type LoggedUserStateType = LoggedUserType & StateStatusType;

export type LoginUserDataType = {
  username: string;
  password: string;
};

type ScReactText = string | number;
type ScReactChild = ReactElement | ScReactText;

interface ReactNodeArray extends Array<ScReactNode> {}
type ReactFragment = {} | ReactNodeArray;
export type ScReactNode =
  | ScReactChild
  | ReactFragment
  | ReactPortal
  | boolean
  | null
  | undefined;

export type ScPropsType = {
  children: ScReactNode;
};

export type ChainItemType = {
  id: number;
  item_name: string;
  item_description: string;
  color: string;
  price: string;
  supplier: string;
  manufacturer: string;
  batch_number: string;
  weight: number;
  dimensions: string;
  quantity: number;
  status: string;
  created_by?: number;
  created_at?: string;
  updated_at?: string;
  parent_item?: number;
};

export type ChainItemTypeListStateType = {
  chainItemsList: ChainItemType[];
  CurrentEditItem?: ChainItemType | null;
  CurrentDeleteItem?: ChainItemType | null;
} & StateStatusType;

export type ChainEventCatsType = {
  id: number;
  name: string;
  description: string;
};

export type ChainEventCatsListStateType = {
  EventTypesList: ChainEventCatsType[];
} & StateStatusType;

export type ChainEventStatusType = {
  id: number;
  name: string;
  description: string;
  color: string;
};

export type ChainEventStatusListStateType = {
  EventStatusList: ChainEventStatusType[];
} & StateStatusType;

export type ChainEventType = {
  id: number;
  created_by?: number;
  created_at?: string;
  updated_at?: string;
  timestamp?: string;
  location?: string;
  description: string;
  action?: string;
  additional_parties_involved?: string;
  documentation?: string;
  signature?: string;
  item?: ChainItemType | null;
  event_type?: ChainEventCatsType;
  custodian?: UserType;
  event_status?: ChainEventStatusType;
  parent_event?: number;
  next_event?: number;
};

export type ChainEventSaveType = {
  id: number;
  created_by?: number;
  created_at?: string;
  updated_at?: string;
  timestamp?: string;
  location?: string;
  description: string;
  action?: string;
  additional_parties_involved?: string;
  documentation?: string;
  signature?: string;
  item?: number | null;
  event_type?: number;
  custodian?: number;
  event_status?: number;
  parent_event?: number;
  next_event?: number;
};

export type ChainEventTypeListStateType = {
  SupplyChainIItem?: ChainItemType | null;
  chainIEventList: ChainEventType[];
  CurrentEditChainEvent?: ChainEventType | null;
  CurrentDeleteChainEvent?: ChainEventType | null;
} & StateStatusType;
