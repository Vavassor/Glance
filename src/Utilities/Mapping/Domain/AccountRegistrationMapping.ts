import { AccountRegistration as AccountRegistrationModel } from "Models";
import { AccountRegistration } from "Types/Domain";

export const getAccountRegistrationFromModel = (
  model: AccountRegistrationModel
) => {
  const { email, password, username } = model;
  const accountRegistration: AccountRegistration = {
    email,
    emailVerificationCode: model.email_verification_code,
    id: model.id.toString(),
    password,
    username,
  };
  return accountRegistration;
};
