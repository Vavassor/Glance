import { Document } from "mongoose";
import { AccountPublic } from "Types/Domain";
import { AccountModel } from "Types/Models";

export const getAccountPublicFromAccountModel = (
  model: AccountModel & Document<any, any, AccountModel>
): AccountPublic => {
  const account: AccountPublic = {
    id: model.id,
    username: model.username,
  };
  return account;
};
