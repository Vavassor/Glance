import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "Store";
import { AccessToken } from "Types/Domain";
import { authService } from "Utilities/Api/AuthService";

interface AuthAccount {
  id: string;
}

interface AuthState {
  accounts: AuthAccount[];
  activeAccountIndex: number;
}

interface LogInSpec {
  accessToken: AccessToken;
  id: string;
}

const initialAuthState: AuthState = {
  accounts: [],
  activeAccountIndex: -1,
};

export const authSlice = createSlice({
  initialState: initialAuthState,
  name: "auth",
  reducers: {
    logIn: (state, action: PayloadAction<LogInSpec>) => {
      authService.logIn(action.payload);
      const account: AuthAccount = { id: action.payload.id };
      state.accounts.push(account);
      state.activeAccountIndex = state.accounts.length - 1;
    },
    logOut: (state) => {
      authService.logOut();
      if (state.activeAccountIndex !== -1) {
        state.accounts.splice(state.activeAccountIndex, 1);
        state.activeAccountIndex =
          state.accounts.length > 0 ? state.accounts.length - 1 : -1;
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

export const { logIn, logOut } = authSlice.actions;
export const authReducer = authSlice.reducer;
