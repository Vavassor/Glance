import {
  createAsyncThunk,
  createSlice
} from "@reduxjs/toolkit";
import { RootState } from "Store";
import { AsyncCallState } from "Types/AsyncCallState";
import { AccountRegistration, AccountRegistrationSpec } from "Types/Domain";
import { createAccountRegistration as createRegistration } from "Utilities/Api";
import { buildAsyncCall, createAsyncCallState } from "Utilities/ReduxUtilities";

interface AccountRegistrationState {
  createRegistration: AsyncCallState<AccountRegistration>;
}

const initialAcccountRegistrationState: AccountRegistrationState = {
  createRegistration: createAsyncCallState(),
};

export const createAccountRegistration = createAsyncThunk(
  "accountRegistration/create",
  async (spec: AccountRegistrationSpec) => {
    return await createRegistration(spec);
  }
);

export const accountRegistrationSlice = createSlice({
  extraReducers: (builder) => {
    buildAsyncCall(builder, "createRegistration", createAccountRegistration);
  },
  initialState: initialAcccountRegistrationState,
  name: "accountRegistration",
  reducers: {
    completeAccountRegistration: (state) => {
      state.createRegistration.data = null;
    },
  },
});

export const selectAccountRegistration = (state: RootState) =>
  state.accountRegistration.createRegistration.data;

export const { completeAccountRegistration } = accountRegistrationSlice.actions;
export const accountRegistrationReducer = accountRegistrationSlice.reducer;
