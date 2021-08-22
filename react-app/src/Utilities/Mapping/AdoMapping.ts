import { AccountRegistrationSpecAdo, AccountSpecAdo } from "Types/Ado";
import { AccountRegistrationSpec, AccountSpec } from "Types/Domain";

export const getAdoFromAccountRegistrationSpec = (
  accountRegistrationSpec: AccountRegistrationSpec
) => {
  const { email, password, username } = accountRegistrationSpec;
  const ado: AccountRegistrationSpecAdo = {
    email,
    password,
    username,
  };
  return ado;
};

export const getAdoFromAccountSpec = (spec: AccountSpec) => {
  const { accountRegistrationId, verificationCode } = spec;
  const ado: AccountSpecAdo = {
    account_registration_id: accountRegistrationId,
    email_verification_code: verificationCode,
  };
  return ado;
};
