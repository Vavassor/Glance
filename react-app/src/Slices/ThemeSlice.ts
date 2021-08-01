import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "Store";
import { LayoutDirection, ThemeMode } from "Types/Theme";

interface ThemeState {
  layoutDirection: LayoutDirection;
  mode: ThemeMode;
}

const initialThemeState: ThemeState = {
  layoutDirection: LayoutDirection.LTR,
  mode: window.matchMedia("(prefers-color-scheme: dark)").matches
    ? ThemeMode.Dark
    : ThemeMode.Light,
};

export const themeSlice = createSlice({
  initialState: initialThemeState,
  name: "theme",
  reducers: {
    setLayoutDirection: (state, action: PayloadAction<LayoutDirection>) => {
      state.layoutDirection = action.payload;
    },
    setMode: (state, action: PayloadAction<ThemeMode>) => {
      state.mode = action.payload;
    },
  },
});

export const selectLayoutDirection = (state: RootState) =>
  state.theme.layoutDirection;
export const selectMode = (state: RootState) => state.theme.mode;

export const { setLayoutDirection, setMode } = themeSlice.actions;
export const themeReducer = themeSlice.reducer;
