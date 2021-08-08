import { AccountPublicAdo } from "Types/Ado";
import { AccountPublic } from "Types/Domain";

export const getAccountPublicAdoFromAccountPublic = (
  account: AccountPublic
) => {
  const { id, username } = account;
  const accountPublic: AccountPublicAdo = {
    id,
    username,
  };
  return accountPublic;
};
