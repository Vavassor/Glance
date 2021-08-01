import { useAppDispatch, useAppSelector } from "Hooks/ReduxHooks";
import { useEffect } from "react";
import { selectMode, setMode } from "Slices/ThemeSlice";
import { ThemeMode } from "Types/Theme";

export const useThemeModeSetup = () => {
  const dispatch = useAppDispatch();
  const mode = useAppSelector(selectMode);

  useEffect(() => {
    const handleChange = (event: MediaQueryListEvent) => {
      const mode = event.matches ? ThemeMode.Dark : ThemeMode.Light;
      dispatch(setMode(mode));
    };

    const mediaQueryList = window.matchMedia("(prefers-color-scheme: dark)");
    mediaQueryList.addEventListener("change", handleChange);

    return () => {
      mediaQueryList.removeEventListener("change", handleChange);
    };
  }, [dispatch]);

  useEffect(() => {
    if (mode === ThemeMode.Dark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [mode]);
};
