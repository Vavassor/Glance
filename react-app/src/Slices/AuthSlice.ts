import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "Store";
import { AccessToken } from "Types/Domain";
import { findById } from "Utilities/Array";

interface AuthAccount {
  accessToken: AccessToken;
  id: string;
}

interface AuthState {
  accounts: AuthAccount[];
  activeAccountIndex: number;
}

const initialAuthState: AuthState = {
  accounts: [],
  activeAccountIndex: -1,
};

export const authSlice = createSlice({
  initialState: initialAuthState,
  name: "auth",
  reducers: {
    logIn: (state, action: PayloadAction<AuthAccount>) => {
      state.accounts.push(action.payload);
      state.activeAccountIndex = state.accounts.length - 1;
    },
    logOut: (state) => {
      if (state.activeAccountIndex !== -1) {
        state.accounts.splice(state.activeAccountIndex, 1);
        state.activeAccountIndex =
          state.accounts.length > 0 ? state.accounts.length - 1 : -1;
      }
    },
    refreshAccessToken: (state, action: PayloadAction<AuthAccount>) => {
      const account = findById(state.accounts, action.payload.id);
      if (account) {
        account.accessToken = action.payload.accessToken;
      }
    },
  },
});

export const selectActiveAccount = (state: RootState) =>
  state.auth.activeAccountIndex !== -1
    ? state.auth.accounts[state.auth.activeAccountIndex]
    : null;

export const selectIsLoggedIn = (state: RootState) =>
  state.auth.activeAccountIndex !== -1;

export const { logIn, logOut, refreshAccessToken } = authSlice.actions;
export const authReducer = authSlice.reducer;
