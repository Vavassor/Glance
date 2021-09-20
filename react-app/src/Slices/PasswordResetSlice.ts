import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "Store";
import { AsyncCallState } from "Types/AsyncCallState";
import {
  IdentifyAccount,
  IdentifyAccountResult,
  SendPasswordReset,
} from "Types/Domain";
import {
  identifyAccount as callIdentifyAccount,
  sendPasswordReset as callSendPasswordReset,
} from "Utilities/Api";
import { buildAsyncCall, createAsyncCallState } from "Utilities/ReduxUtilities";

interface PasswordResetState {
  identifyAccount: AsyncCallState<IdentifyAccountResult>;
  sendPasswordReset: AsyncCallState<SendPasswordReset>;
}

const initialPasswordResetState: PasswordResetState = {
  identifyAccount: createAsyncCallState(),
  sendPasswordReset: createAsyncCallState(),
};

export const identifyAccount = createAsyncThunk(
  "passwordReset/identifyAccount",
  async (identify: IdentifyAccount) => {
    return await callIdentifyAccount(identify);
  }
);

export const sendPasswordReset = createAsyncThunk(
  "passwordReset/sendPasswordReset",
  async (sendPasswordReset: SendPasswordReset) => {
    return await callSendPasswordReset(sendPasswordReset);
  }
);

export const passwordResetSlice = createSlice({
  extraReducers: (builder) => {
    buildAsyncCall(builder, "identifyAccount", identifyAccount);
    buildAsyncCall(builder, "sendPasswordReset", sendPasswordReset);
  },
  initialState: initialPasswordResetState,
  name: "passwordReset",
  reducers: {},
});

export const selectIdentifyAccountResult = (state: RootState) =>
  state.passwordReset.identifyAccount.data;

export const passwordResetReducer = passwordResetSlice.reducer;
