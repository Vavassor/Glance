import { defaultLocale, SENDER_EMAIL } from "Constants";
import { RequestHandler } from "express";
import { TFunction } from "i18next";
import { join } from "path";
import * as AccountRegistrationRepository from "Repositories/AccountRegistrationRepository";
import {
  AccountRegistrationAdo,
  AccountRegistrationSpecAdo,
  ErrorAdo,
} from "Types/Ado";
import { ParamsDictionary, ParsedQs } from "Types/Express";
import { config } from "Utilities/Config";
import { sendEmail } from "Utilities/Email";
import { fileExists, readTextFile } from "Utilities/Filesystem";
import { getAdoFromAccountRegistration } from "Utilities/Mapping/Ado";
import { getAccountRegistrationSpecFromAdo } from "Utilities/Mapping/Domain";
import { hash } from "Utilities/Password";
import { getRandomBase10 } from "Utilities/Random";
import { fillTemplate } from "Utilities/Template";

const sendVerificationEmail = async (
  recipientEmail: string,
  verificationCode: string,
  t: TFunction,
  language: string,
  defaultLanguage: string
) => {
  const { fileRoot } = config;

  const localeFolder = language;
  let templateFolder = join(fileRoot, "Assets/Email Templates", localeFolder);
  const hasTemplatesForLanguage = await fileExists(templateFolder);
  if (!hasTemplatesForLanguage) {
    templateFolder = join(fileRoot, "Assets/Email Templates", defaultLanguage);
  }

  const htmlTemplate = await readTextFile(
    join(templateFolder, "verify_email.html.template")
  );
  const textTemplate = await readTextFile(
    join(templateFolder, "verify_email.txt.template")
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
    from: SENDER_EMAIL,
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
  const account = await AccountRegistrationRepository.createAccountRegistration(
    accountSpec
  );
  await sendVerificationEmail(
    email,
    emailVerificationCode,
    request.t,
    request.language,
    defaultLocale
  );
  response.json(getAdoFromAccountRegistration(account));
};
