import { RequestHandler, Response as ExpressResponse } from "express";
import { TFunction } from "i18next";
import { HttpStatus } from "Types/HttpStatus";
import { escapeQuotes } from "Utilities/Ascii";
import { config, getPrivateKey } from "Utilities/Config";
import { getAuthorizationField } from "Utilities/HttpHeader";
import { getEnglishT } from "Utilities/Internationalization";
import { getErrorAdoFromMessage } from "Utilities/Mapping/Ado";
import { JwtPayload, verifyAccessToken } from "Utilities/Token";

const respondWithFailure = (
  response: ExpressResponse,
  englishT: TFunction,
  t: TFunction,
  status: HttpStatus,
  error: string,
  errorKey: string
) => {
  const wwwAuthenticate = [
    "Bearer",
    `error="${error}"`,
    `error_description="${escapeQuotes(englishT(errorKey))}"`,
  ].join(", ");

  response
    .status(status)
    .header("WWW-Authenticate", wwwAuthenticate)
    .json(getErrorAdoFromMessage(t(errorKey)));
};

const respondWithInvalidRequest = (
  response: ExpressResponse,
  englishT: TFunction,
  t: TFunction
) => {
  respondWithFailure(
    response,
    englishT,
    t,
    HttpStatus.BadRequest,
    "invalid_request",
    "token.invalid_request_error_description"
  );
};

const respondWithInvalidToken = (
  response: ExpressResponse,
  englishT: TFunction,
  t: TFunction
) => {
  respondWithFailure(
    response,
    englishT,
    t,
    HttpStatus.Unauthorized,
    "invalid_token",
    "token.invalid_token_error_description"
  );
};

export const authorizeToken: RequestHandler = async (
  request,
  response,
  next
) => {
  const englishT = getEnglishT();

  const authorization = request.header("Authorization");
  if (!authorization) {
    return respondWithInvalidRequest(response, englishT, request.t);
  }

  const authorizationField = getAuthorizationField(authorization);
  if (!authorizationField) {
    return respondWithInvalidRequest(response, englishT, request.t);
  }
  if (authorizationField.type !== "Bearer") {
    return respondWithInvalidRequest(response, englishT, request.t);
  }

  const { token } = authorizationField;
  const privateKey = await getPrivateKey(config);

  let jwtPayload: JwtPayload;
  try {
    jwtPayload = await verifyAccessToken(token, privateKey);
  } catch (error) {
    return respondWithInvalidToken(response, englishT, request.t);
  }

  // @TODO Check that scopes are allowed.

  const accountId = jwtPayload.sub;

  // @TODO Check that account exists.

  response.locals.accountId = accountId;

  next();
};
