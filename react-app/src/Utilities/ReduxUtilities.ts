import { ActionReducerMapBuilder, AsyncThunk } from "@reduxjs/toolkit";
import { AsyncCallState } from "Types/AsyncCallState";
import { AsyncStatus } from "Types/AsyncStatus";

/**
 * Adds reducers for an async call's state.
 * Meant to use inside extraReducers in a call to createSlice.
 */
export function buildAsyncCall<StateType, ParamType, DataType>(
  builder: ActionReducerMapBuilder<StateType>,
  key: keyof StateType,
  thunk: AsyncThunk<DataType, ParamType, {}>
) {
  builder
    .addCase(thunk.fulfilled, (state, action) => {
      (state as any)[key].data = action.payload;
      (state as any)[key].status = AsyncStatus.Success;
    })
    .addCase(thunk.pending, (state, action) => {
      (state as any)[key].data = null;
      (state as any)[key].error = null;
      (state as any)[key].status = AsyncStatus.Pending;
    })
    .addCase(thunk.rejected, (state, action) => {
      (state as any)[key].error = action.error;
      (state as any)[key].status = AsyncStatus.Failure;
    });
}

export function createAsyncCallState<T>() {
  const state: AsyncCallState<T> = {
    data: null,
    error: null,
    status: AsyncStatus.Idle,
  };
  return state;
}
