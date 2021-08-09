import { useCallback } from "react";
import { refreshAccessToken, selectActiveAccount } from "Slices/AuthSlice";
import { exchangeRefreshToken } from "Utilities/Api/AuthResource";
import { isAfterDate } from "Utilities/Date";
import {
  createStoredAccessToken,
  loadAccount,
  storeAccount,
} from "Utilities/Storage";
import { useAppDispatch, useAppSelector } from "./ReduxHooks";

export const useAccessToken = () => {
  const dispatch = useAppDispatch();
  const activeAccount = useAppSelector(selectActiveAccount);

  const getRefreshedAccessToken = useCallback(async () => {
    if (!activeAccount) {
      throw new Error(
        "Missing an active account while refreshing an access token."
      );
    }

    const { accessToken } = activeAccount;

    if (isAfterDate(new Date(), new Date(accessToken.expirationDate))) {
      const storedAccount = loadAccount(activeAccount.id);
      if (!storedAccount) {
        throw new Error(
          "Missing a stored account while refreshing an access token."
        );
      }

      const newAccessToken = await exchangeRefreshToken(
        storedAccount.refresh_token
      );
      storedAccount.access_token = createStoredAccessToken(newAccessToken);
      storeAccount(storedAccount);
      dispatch(
        refreshAccessToken({
          accessToken: newAccessToken,
          id: activeAccount.id,
        })
      );

      return newAccessToken;
    }

    return accessToken;
  }, [activeAccount, dispatch]);

  return { getRefreshedAccessToken };
};
