import { AccountPublicAdo } from "Types/Ado/AccountPublicAdo";
import { AccountPublic } from "Types/Domain";

export const getAccountPublicAdoFromAccountPublic = (
  account: AccountPublic
): AccountPublicAdo => {
  const { id, username } = account;
  return {
    id,
    username,
  };
};
