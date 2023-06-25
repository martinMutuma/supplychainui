import { ReactElement } from "react";

export type ChildrenType = { children?: ReactElement | ReactElement[] };

export type UserType = { email: string; username?: string; id?: Number };

export type LoggedUserType = UserType & {
  access?: string;
  refresh?: string;
  isLoggedIn: boolean;
};

export type StateStatusType = { loading: boolean; error: string | null };

export type LoggedUserStateType = LoggedUserType & StateStatusType;

export type LoginUserDataType = {
  username: string;
  password: string;
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
  weight: string;
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
  CurrentItem?: ChainItemType | null;
} & StateStatusType;
