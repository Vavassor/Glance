import { configureStore } from "@reduxjs/toolkit";
import { accountRegistrationReducer } from "Slices/AccountRegistrationSlice";
import { authReducer } from "Slices/AuthSlice";
import { passwordResetReducer } from "Slices/PasswordResetSlice";
import { themeReducer } from "Slices/ThemeSlice";

export const store = configureStore({
  reducer: {
    accountRegistration: accountRegistrationReducer,
    auth: authReducer,
    passwordReset: passwordResetReducer,
    theme: themeReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
