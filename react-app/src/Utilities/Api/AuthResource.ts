import { TokenGrantPasswordAdo, TokenGrantRefreshTokenAdo } from "Types/Ado";
import { getEnvironment } from "Utilities/Environment";
import { getAccessTokenFromTokenAdo } from "Utilities/Mapping/DomainMapping";
import { isTokenAdo } from "Utilities/Typeguards";
import { callApi } from "./ApiUtilities";

export const exchangePassword = async (username: string, password: string) => {
  const { oauthClientId } = getEnvironment();

  const tokenGrantAdo: TokenGrantPasswordAdo = {
    client_id: oauthClientId,
    grant_type: "password",
    password,
    scope: "offline_access",
    username,
  };

  const tokenAdo = await callApi("auth/token", {
    method: "POST",
    body: tokenGrantAdo,
  });

  if (!isTokenAdo(tokenAdo)) {
    throw new Error(
      "The response body was not the expected type 'AccessTokenAdo'."
    );
  }

  return getAccessTokenFromTokenAdo(tokenAdo);
};

export const exchangeRefreshToken = async (refreshToken: string) => {
  const { oauthClientId } = getEnvironment();

  const tokenGrantAdo: TokenGrantRefreshTokenAdo = {
    client_id: oauthClientId,
    grant_type: "refresh_token",
    refresh_token: refreshToken,
  };

  const tokenAdo = await callApi("auth/token", {
    method: "POST",
    body: tokenGrantAdo,
  });

  if (!isTokenAdo(tokenAdo)) {
    throw new Error(
      "The response body was not the expected type 'AccessTokenAdo'."
    );
  }

  return getAccessTokenFromTokenAdo(tokenAdo);
};
