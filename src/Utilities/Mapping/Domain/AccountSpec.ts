import { AccountRegistration, AccountSpec } from "Types/Domain";

export const getAccountSpecFromAccountRegistration = (
  accountRegistration: AccountRegistration
) => {
  const { email, password, username } = accountRegistration;
  const accountSpec: AccountSpec = {
    email,
    password,
    username,
  };
  return accountSpec;
};
