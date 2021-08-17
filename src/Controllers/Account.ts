import { RequestHandler } from "express";
import * as AccountRegistrationRepository from "Repositories/AccountRegistrationRepository";
import * as AccountRepository from "Repositories/AccountRepository";
import {
  AccountAdo,
  AccountSpecAdo,
  ErrorAdo,
  IdentifyAccountAdo,
  IdentifyAccountResultAdo,
  PasswordUpdateAdo,
} from "Types/Ado";
import { Account } from "Types/Domain";
import { AccountLocals, ParamsDictionary, ParsedQs } from "Types/Express";
import { HttpStatus } from "Types/HttpStatus";
import {
  getAccountAdoFromAccount,
  getErrorAdoFromMessage,
} from "Utilities/Mapping/Ado";
import {
  getIdentifyAccountResultAdoFromEmail,
  getIdentifyAccountResultAdoFromUsername,
} from "Utilities/Mapping/Ado/IdentifyAccountResultAdo";
import { getAccountSpecFromAccountRegistration } from "Utilities/Mapping/Domain";
import { obscureEmail } from "Utilities/Obscuration";
import { hash } from "Utilities/Password";
import isEmail from "validator/lib/isEmail";

export const createAccount: RequestHandler<
  ParamsDictionary,
  AccountAdo | ErrorAdo,
  AccountSpecAdo,
  ParsedQs
> = async (request, response, next) => {
  const { account_registration_id, email_verification_code } = request.body;
  const accountRegistration =
    await AccountRegistrationRepository.findAccountRegistrationById(
      account_registration_id
    );

  if (!accountRegistration) {
    return response
      .status(HttpStatus.UnprocessableEntity)
      .json(
        getErrorAdoFromMessage(
          request.t("account.account_registration_id_not_found_error")
        )
      );
  }

  if (accountRegistration?.emailVerificationCode !== email_verification_code) {
    return response
      .status(HttpStatus.UnprocessableEntity)
      .json(
        getErrorAdoFromMessage(
          request.t("account.email_verification_code_invalid_error")
        )
      );
  }

  const accountSpec =
    getAccountSpecFromAccountRegistration(accountRegistration);
  const account = await AccountRepository.createAccount(accountSpec);
  response.json(getAccountAdoFromAccount(account));
};

export const deleteAccount: RequestHandler<
  ParamsDictionary,
  ErrorAdo,
  any,
  ParsedQs
> = async (request, response, next) => {
  await AccountRepository.deleteAccount(request.params.id);
  response.status(HttpStatus.NoContent).end();
};

export const getAccountById: RequestHandler<
  ParamsDictionary,
  AccountAdo | ErrorAdo,
  any,
  ParsedQs
> = async (request, response, next) => {
  const account = await AccountRepository.findAccountById(request.params.id);
  if (!account) {
    response
      .status(HttpStatus.NotFound)
      .json(getErrorAdoFromMessage(request.t("account.id_not_found_error")));
  } else {
    response.json(getAccountAdoFromAccount(account));
  }
};

export const identifyAccount: RequestHandler<
  ParamsDictionary,
  IdentifyAccountResultAdo | ErrorAdo,
  IdentifyAccountAdo,
  ParsedQs
> = async (request, response, next) => {
  const { query } = request.body;
  const isQueryEmail = isEmail(query);

  let account: Account | null;
  if (isQueryEmail) {
    account = await AccountRepository.findAccountByEmail(query);
  } else {
    account = await AccountRepository.findAccountByUsername(query);
  }

  if (!account) {
    response
      .status(HttpStatus.UnprocessableEntity)
      .json(getErrorAdoFromMessage(request.t("account.id_not_found_error")));
    return;
  }

  const obscuredEmail = obscureEmail(account.email);

  // @TODO Load a side channel ID.
  const sideChannelId = "0";

  let resultAdo: IdentifyAccountResultAdo;
  if (isQueryEmail) {
    resultAdo = getIdentifyAccountResultAdoFromEmail(
      account.email,
      obscuredEmail,
      sideChannelId
    );
  } else {
    resultAdo = getIdentifyAccountResultAdoFromUsername(
      account.username,
      obscuredEmail,
      sideChannelId
    );
  }
  response.json(resultAdo);
};

export const updatePassword: RequestHandler<
  ParamsDictionary,
  ErrorAdo,
  PasswordUpdateAdo,
  ParsedQs,
  AccountLocals
> = async (request, response, next) => {
  const { accountId } = response.locals;
  const { password } = request.body;
  const hashedPassword = await hash(password);
  await AccountRepository.updatePasswordForAccount(hashedPassword, accountId);
  response.status(HttpStatus.NoContent).header("Content-Length", "0").end();
};
