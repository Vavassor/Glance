import { AccountRegistrationSpecAdo } from "Types/Ado";
import { AccountRegistrationSpec } from "Types/Domain";

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
