import { RequestHandler } from "express";
import { findAppByClientId } from "Repositories/AppRepository";
import {
  OAuthErrorAdo,
  OAuthErrorType,
  TokenAdo,
  TokenGrantAdo,
} from "Types/Ado";
import { ParamsDictionary, ParsedQs } from "Types/Express";
import { HttpStatus } from "Types/HttpStatus";
import { getAuthorizationField } from "Utilities/HttpHeader";
import { getEnglishT } from "Utilities/Internationalization";
import { getOAuthErrorAdo } from "Utilities/Mapping/Ado";
import { compareHash } from "Utilities/Password";

export const authenticateClient: RequestHandler<
  ParamsDictionary,
  TokenAdo | OAuthErrorAdo,
  TokenGrantAdo,
  ParsedQs
> = async (request, response, next) => {
  let clientId = undefined;
  let clientSecret = undefined;

  const authorization = request.header("Authorization");
  if (authorization) {
    const authorizationField = getAuthorizationField(authorization);
    switch (authorizationField?.type) {
      case "Basic": {
        const { username, password } = authorizationField;
        clientId = username;
        clientSecret = password;
        break;
      }

      default:
        return response
          .status(HttpStatus.Unauthorized)
          .header("WWW-Authenticate", "Basic")
          .json(
            getOAuthErrorAdo(
              OAuthErrorType.InvalidClient,
              getEnglishT(),
              request.t,
              "token.unsupported_authentication_method_error_description"
            )
          );
    }
  }

  clientId = clientId || request.body.client_id;
  clientSecret = clientSecret || request.body.client_secret;

  if (clientId && clientSecret) {
    const app = await findAppByClientId(clientId);
    if (!app) {
      return response
        .status(HttpStatus.Unauthorized)
        .json(
          getOAuthErrorAdo(
            OAuthErrorType.InvalidClient,
            getEnglishT(),
            request.t
          )
        );
    }

    const { clientSecret: clientSecretHash } = app;
    const isSecretMatch = await compareHash(clientSecret, clientSecretHash);
    if (!isSecretMatch) {
      return response
        .status(HttpStatus.Unauthorized)
        .json(
          getOAuthErrorAdo(
            OAuthErrorType.InvalidClient,
            getEnglishT(),
            request.t
          )
        );
    }
  }

  // @TODO Check if the grant type is allowed for the given client. In
  // particular, if a third-party client attempts to use the resource owner
  // password grant type.

  request.clientId = clientId;

  next();
};
