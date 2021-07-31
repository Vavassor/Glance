import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "Store";
import { LayoutDirection } from "Types/Theme";

interface ThemeState {
  layoutDirection: LayoutDirection;
}

const initialThemeState: ThemeState = {
  layoutDirection: LayoutDirection.LTR,
};

export const themeSlice = createSlice({
  initialState: initialThemeState,
  name: "theme",
  reducers: {
    setLayoutDirection: (state, action: PayloadAction<LayoutDirection>) => {
      state.layoutDirection = action.payload;
    },
  },
});

export const selectLayoutDirection = (state: RootState) =>
  state.theme.layoutDirection;

export const { setLayoutDirection } = themeSlice.actions;
export const themeReducer = themeSlice.reducer;
