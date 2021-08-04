import type { Account as AccountModel } from "Models";
import { AccountPublic } from "Types/Domain";

export const getAccountPublicFromAccountModel = (
  model: AccountModel
): AccountPublic => {
  const account: AccountPublic = {
    id: model.id.toString(),
    username: model.username,
  };
  return account;
};
