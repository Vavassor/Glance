import {
  defaultLocale,
  PASSWORD_RESET_TOKEN_LIFETIME_SECONDS,
  SENDER_EMAIL,
} from "Constants";
import { RequestHandler } from "express";
import { join } from "path";
import * as AccountRegistrationRepository from "Repositories/AccountRegistrationRepository";
import * as AccountRepository from "Repositories/AccountRepository";
import {
  AccountAdo,
  AccountSpecAdo,
  ErrorAdo,
  IdentifyAccountAdo,
  IdentifyAccountResultAdo,
  PasswordUpdateAdo,
  SendPasswordResetAdo,
} from "Types/Ado";
import { Account } from "Types/Domain";
import { AccountLocals, ParamsDictionary, ParsedQs } from "Types/Express";
import { HttpStatus } from "Types/HttpStatus";
import { IdType } from "Types/IdType";
import { config, getPrivateKey } from "Utilities/Config";
import { deviceDetector, parseUserAgent } from "Utilities/DeviceDetector";
import { sendEmail } from "Utilities/Email";
import { getEmailTemplates } from "Utilities/EmailTemplate";
import {
  getAccountAdoFromAccount,
  getErrorAdoFromMessage,
  getIdentifyAccountResultAdoFromEmail,
  getIdentifyAccountResultAdoFromUsername,
} from "Utilities/Mapping/Ado";
import { getAccountSpecFromAccountRegistration } from "Utilities/Mapping/Domain";
import { obscureEmail } from "Utilities/Obscuration";
import { getPartialDoubleHash, hash } from "Utilities/Password";
import { fillTemplate } from "Utilities/Template";
import { createPasswordResetToken } from "Utilities/Token";
import { addQueryParameters } from "Utilities/Url";
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
  const account = await AccountRepository.createAccount(
    accountSpec,
    accountRegistration.id
  );
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

export const sendPasswordReset: RequestHandler<
  ParamsDictionary,
  ErrorAdo,
  SendPasswordResetAdo,
  ParsedQs
> = async (request, response, next) => {
  let account: Account | null;

  const { id } = request.body;
  switch (id.type) {
    case IdType.Email:
      account = await AccountRepository.findAccountByEmail(id.email);
      break;

    case IdType.Username:
      account = await AccountRepository.findAccountByUsername(id.username);
      break;
  }

  if (!account) {
    response
      .status(HttpStatus.UnprocessableEntity)
      .json(getErrorAdoFromMessage(request.t("account.id_not_found_error")));
    return;
  }

  // @TODO Use the side channel info in 'request.body' to determine where to
  // send the reset token, instead of defaulting to the email.

  const key = await getPartialDoubleHash(account.password);
  const privateKey = await getPrivateKey(config);
  const passwordResetToken = await createPasswordResetToken(
    key,
    account.id,
    PASSWORD_RESET_TOKEN_LIFETIME_SECONDS,
    privateKey,
    config.urlRoot
  );

  const userAgent = request.header("User-Agent");
  const { client, os } = parseUserAgent(userAgent, deviceDetector);

  const { htmlTemplate, textTemplate } = await getEmailTemplates(
    "password_reset_email",
    request.language,
    defaultLocale
  );

  const path = join(config.urlRoot, "password-reset");
  const passwordResetLink = addQueryParameters(path, {
    token: passwordResetToken,
  });

  const templateSpec = {
    browser_name: client.name,
    operating_system: os.name,
    password_reset_link: passwordResetLink,
    product_name: request.t("app.title"),
    recipient_name: account.username,
  };

  await sendEmail({
    html: fillTemplate(htmlTemplate, templateSpec),
    from: SENDER_EMAIL,
    subject: "Password Reset Requested",
    text: fillTemplate(textTemplate, templateSpec),
    to: account.email,
  });

  response.status(HttpStatus.NoContent).header("Content-Length", "0").end();
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
