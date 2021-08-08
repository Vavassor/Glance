import type { Account as AccountModel } from "Models";
import { Account, AccountPublic } from "Types/Domain";

export const getAccountPublicFromAccountModel = (model: AccountModel) => {
  const account: AccountPublic = {
    id: model.id.toString(),
    username: model.username,
  };
  return account;
};

export const getAccountFromAccountModel = (model: AccountModel) => {
  const { email, password, username } = model;
  const account: Account = {
    email,
    id: model.id.toString(),
    password,
    username,
  };
  return account;
};
