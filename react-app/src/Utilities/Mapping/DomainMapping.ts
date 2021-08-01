import { PostAdo } from "Types/Ado";
import { AccountAdo, AccountPublicAdo } from "Types/Ado/AccountAdo";
import { Account, AccountPublic, Post } from "Types/Domain";

export const getAccountFromAccountAdo = (accountAdo: AccountAdo): Account => {
  const { email, id, username } = accountAdo;
  return {
    email,
    id,
    username,
  };
};

export const getAccountPublicFromAccountPublicAdo = (
  accountPublicAdo: AccountPublicAdo
): AccountPublic => {
  const { id, username } = accountPublicAdo;
  return {
    id,
    username,
  };
};

export const getPostFromPostAdo = (postAdo: PostAdo): Post => {
  const { account, content, creation_date, id, title } = postAdo;
  return {
    account: getAccountPublicFromAccountPublicAdo(account),
    content,
    creationDate: new Date(creation_date),
    id,
    title,
  };
};
