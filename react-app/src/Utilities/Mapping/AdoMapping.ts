import {
  AccountRegistrationSpecAdo,
  AccountSpecAdo,
  IdentifyAccountAdo,
} from "Types/Ado";
import { AccountRegistrationSpec, AccountSpec } from "Types/Domain";
import { IdentifyAccount } from "Types/Domain/IdentifyAccount";

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

export const getAdoFromIdentifyAccount = (identify: IdentifyAccount) => {
  const { query } = identify;
  const ado: IdentifyAccountAdo = {
    query,
  };
  return ado;
};
