import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "Store";
import { IdentifyAccountResult } from "Types/Domain";

interface PasswordResetState {
  identifyAccountResult: IdentifyAccountResult | null;
}

const initialPasswordResetState: PasswordResetState = {
  identifyAccountResult: null,
};

export const passwordResetSlice = createSlice({
  initialState: initialPasswordResetState,
  name: "passwordReset",
  reducers: {
    setIdentifyAccountResult: (
      state,
      action: PayloadAction<IdentifyAccountResult>
    ) => {
      state.identifyAccountResult = action.payload;
    },
  },
});

export const selectIdentifyAccountResult = (state: RootState) =>
  state.passwordReset.identifyAccountResult;

export const { setIdentifyAccountResult } = passwordResetSlice.actions;
export const passwordResetReducer = passwordResetSlice.reducer;
