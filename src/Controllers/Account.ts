import { RequestHandler } from "express";
import * as AccountRepository from "Repositories/AccountRepository";
import { AccountAdo, AccountSpecAdo, ErrorAdo, PasswordUpdateAdo } from "Types/Ado";
import { AccountLocals, ParamsDictionary, ParsedQs } from "Types/Express";
import { HttpStatus } from "Types/HttpStatus";
import {
  getAccountAdoFromAccount,
  getErrorAdoFromMessage,
} from "Utilities/Mapping/Ado";
import { getAccountSpecFromAccountSpecAdo } from "Utilities/Mapping/Domain";
import { hash } from "Utilities/Password";

export const createAccount: RequestHandler<
  ParamsDictionary,
  AccountAdo | ErrorAdo,
  AccountSpecAdo,
  ParsedQs
> = async (request, response, next) => {
  const accountSpec = getAccountSpecFromAccountSpecAdo(request.body);
  accountSpec.password = await hash(accountSpec.password);
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
