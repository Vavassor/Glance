import { RequestHandler } from "express";
import { TFunction } from "i18next";
import { join } from "path";
import * as RegistrationAccountRepository from "Repositories/RegistrationAccountRepository";
import {
  AccountRegistrationAdo,
  AccountRegistrationSpecAdo,
  ErrorAdo,
} from "Types/Ado";
import { ParamsDictionary, ParsedQs } from "Types/Express";
import { config } from "Utilities/Config";
import { sendEmail } from "Utilities/Email";
import { readTextFile } from "Utilities/Filesystem";
import { getAdoFromAccountRegistration } from "Utilities/Mapping/Ado";
import { getAccountRegistrationSpecFromAdo } from "Utilities/Mapping/Domain";
import { hash } from "Utilities/Password";
import { getRandomBase10 } from "Utilities/Random";
import { fillTemplate } from "Utilities/Template";

const sendVerificationEmail = async (
  recipientEmail: string,
  verificationCode: string,
  t: TFunction
) => {
  const { fileRoot } = config;

  // @TODO: Localize the email.

  const htmlTemplate = await readTextFile(
    join(fileRoot, "Assets/Email Templates/verify_email.html.template")
  );
  const textTemplate = await readTextFile(
    join(fileRoot, "Assets/Email Templates/verify_email.txt.template")
  );

  const templateSpec = {
    App_Name: t("app.title"),
    Sender_Address: "123 Main Street",
    Sender_City: "New York",
    Sender_Name: t("app.title"),
    Sender_State: "NY",
    Sender_Zip: "10030",
    Verification_Code: verificationCode,
  };

  await sendEmail({
    from: "glance@glance.social",
    html: fillTemplate(htmlTemplate, templateSpec),
    subject: t("verification_email.subject", {
      email_verification_code: verificationCode,
    }),
    text: fillTemplate(textTemplate, templateSpec),
    to: recipientEmail,
  });
};

export const createAccountRegistration: RequestHandler<
  ParamsDictionary,
  AccountRegistrationAdo | ErrorAdo,
  AccountRegistrationSpecAdo,
  ParsedQs
> = async (request, response, next) => {
  const { email } = request.body;
  const emailVerificationCode = getRandomBase10(6);
  const accountSpec = getAccountRegistrationSpecFromAdo(
    request.body,
    emailVerificationCode
  );
  accountSpec.password = await hash(accountSpec.password);
  const account = await RegistrationAccountRepository.createRegistrationAccount(
    accountSpec
  );
  await sendVerificationEmail(email, emailVerificationCode, request.t);
  response.json(getAdoFromAccountRegistration(account));
};
