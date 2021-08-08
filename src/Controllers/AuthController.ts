import { RequestHandler, Response as ExpressResponse } from "express";
import { TFunction } from "i18next";
import {
  findAccountById,
  findAccountByUsername,
} from "Repositories/AccountRepository";
import {
  createRefreshToken,
  findRefreshTokenById,
} from "Repositories/RefreshTokenRepository";
import {
  OAuthErrorAdo,
  OAuthErrorType,
  TokenAdo,
  TokenGrantAdo,
  TokenGrantPasswordAdo,
  TokenGrantRefreshTokenAdo,
} from "Types/Ado";
import { Account, Token } from "Types/Domain";
import { ParamsDictionary, ParsedQs } from "Types/Express";
import { HttpStatus } from "Types/HttpStatus";
import { Scope } from "Types/Scope";
import { config, getPrivateKey } from "Utilities/Config";
import { getEnglishT } from "Utilities/Internationalization";
import { getOAuthErrorAdo, getTokenAdoFromToken } from "Utilities/Mapping/Ado";
import { compareHash } from "Utilities/Password";
import { getRandomBase64 } from "Utilities/Random";
import { parseScopes } from "Utilities/Scope";
import { createAccessToken } from "Utilities/Token";

const getAccessToken = async (account: Account, scopes?: string[]) => {
  const expiresIn = 3600;
  const privateKey = await getPrivateKey(config);
  const jwtid = getRandomBase64(32);
  const accessToken = await createAccessToken(
    account,
    expiresIn,
    privateKey,
    config.urlRoot,
    jwtid,
    scopes
  );
  return { accessToken, expiresIn };
};

const exchangePassword = async (
  body: TokenGrantPasswordAdo,
  t: TFunction,
  clientId: string,
  response: ExpressResponse<TokenAdo | OAuthErrorAdo>
) => {
  const account = await findAccountByUsername(body.username);
  if (!account) {
    return response
      .status(HttpStatus.BadRequest)
      .json(getOAuthErrorAdo(OAuthErrorType.InvalidGrant, getEnglishT(), t));
  }

  const { password } = account;
  const isPasswordMatch = await compareHash(body.password, password);
  if (!isPasswordMatch) {
    return response
      .status(HttpStatus.BadRequest)
      .json(getOAuthErrorAdo(OAuthErrorType.InvalidGrant, getEnglishT(), t));
  }

  // @TODO Check that scopes are allowed.

  const scopes = parseScopes(body.scope);
  const { accessToken, expiresIn } = await getAccessToken(account, scopes);

  let refreshToken: string | undefined;
  if (scopes?.includes(Scope.OfflineAccess)) {
    const refreshTokenInfo = await createRefreshToken({
      accountId: account.id,
      clientId,
    });
    refreshToken = refreshTokenInfo.id;
  }

  const token: Token = { accessToken, expiresIn, refreshToken };

  response.json(getTokenAdoFromToken(token));
};

const exchangeRefreshToken = async (
  body: TokenGrantRefreshTokenAdo,
  t: TFunction,
  response: ExpressResponse<TokenAdo | OAuthErrorAdo>
) => {
  const refreshToken = await findRefreshTokenById(body.refresh_token);
  if (!refreshToken) {
    return response
      .status(HttpStatus.BadRequest)
      .json(getOAuthErrorAdo(OAuthErrorType.InvalidGrant, getEnglishT(), t));
  }

  const account = await findAccountById(refreshToken.accountId);
  if (!account) {
    return response
      .status(HttpStatus.BadRequest)
      .json(getOAuthErrorAdo(OAuthErrorType.InvalidGrant, getEnglishT(), t));
  }

  const scopes = parseScopes(body.scope);
  const { accessToken, expiresIn } = await getAccessToken(account, scopes);

  const token: Token = { accessToken, expiresIn };

  response.json(getTokenAdoFromToken(token));
};

export const grantToken: RequestHandler<
  ParamsDictionary,
  TokenAdo | OAuthErrorAdo,
  TokenGrantAdo,
  ParsedQs
> = async (request, response, next) => {
  response.header("Cache-Control", "no-store");
  response.header("Pragma", "no-cache");

  switch (request.body.grant_type) {
    case "password":
      await exchangePassword(
        request.body,
        request.t,
        request.clientId!,
        response
      );
      break;

    case "refresh_token":
      await exchangeRefreshToken(request.body, request.t, response);
      break;

    default: {
      return response
        .status(HttpStatus.BadRequest)
        .json(
          getOAuthErrorAdo(
            OAuthErrorType.UnsupportedResponseType,
            getEnglishT(),
            request.t
          )
        );
    }
  }
};
