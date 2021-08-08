import { AccountAdo } from "Types/Ado";
import { Account } from "Types/Domain";

export const getAccountAdoFromAccount = (account: Account) => {
  const { email, id, username } = account;
  const accountAdo: AccountAdo = {
    email,
    id,
    username,
  };
  return accountAdo;
};
