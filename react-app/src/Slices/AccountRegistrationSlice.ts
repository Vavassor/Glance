import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "Store";
import { AccountRegistration } from "Types/Domain";

interface AccountRegistrationState {
  registration: AccountRegistration | null;
}

const initialAcccountRegistrationState: AccountRegistrationState = {
  registration: null,
};

export const accountRegistrationSlice = createSlice({
  initialState: initialAcccountRegistrationState,
  name: "accountRegistration",
  reducers: {
    setAccountRegistration: (
      state,
      action: PayloadAction<AccountRegistration>
    ) => {
      state.registration = action.payload;
    },
  },
});

export const selectAccountRegistration = (state: RootState) =>
  state.accountRegistration.registration;

export const { setAccountRegistration } = accountRegistrationSlice.actions;
export const accountRegistrationReducer = accountRegistrationSlice.reducer;
