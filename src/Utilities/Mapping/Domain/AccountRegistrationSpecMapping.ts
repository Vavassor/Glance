import { AccountRegistrationSpecAdo } from "Types/Ado";
import { AccountRegistrationSpec } from "Types/Domain";

export const getAccountRegistrationSpecFromAdo = (
  ado: AccountRegistrationSpecAdo,
  emailVerificationCode: string
) => {
  const { email, password, username } = ado;
  const spec: AccountRegistrationSpec = {
    email,
    emailVerificationCode,
    password,
    username,
  };
  return spec;
};
