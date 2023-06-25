import { AnyAction, AsyncThunk, SerializedError } from "@reduxjs/toolkit";

//typing following Redux Documentation
export type GenericAsyncThunk = AsyncThunk<unknown, unknown, any>;

export type PendingAction = ReturnType<GenericAsyncThunk["pending"]>;
export type RejectedAction = ReturnType<GenericAsyncThunk["rejected"]>;
export type FulfilledAction = ReturnType<GenericAsyncThunk["fulfilled"]>;

//add error and its type to RejectedAction
type Modify<T, R> = Omit<T, keyof R> & R;
export type ModifiedRejectedAction = Modify<
  RejectedAction,
  {
    error: SerializedError;
  }
>;

//matcher functions
export function isPendingAction(action: AnyAction): action is PendingAction {
  return action.type.endsWith("/pending");
}
export function isFulfilledAction(
  action: AnyAction
): action is FulfilledAction {
  return action.type.endsWith("/fulfilled");
}
export function isRejectedAction(
  action: AnyAction
): action is ModifiedRejectedAction {
  return action.type.endsWith("/rejected");
}
