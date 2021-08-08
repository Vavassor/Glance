import { AccountSpecAdo } from "Types/Ado";
import { AccountSpec } from "Types/Domain";

export const getAccountSpecFromAccountSpecAdo = (
  accountSpecAdo: AccountSpecAdo
) => {
  const { email, password, username } = accountSpecAdo;
  const accountSpec: AccountSpec = {
    email,
    password,
    username,
  };
  return accountSpec;
};
