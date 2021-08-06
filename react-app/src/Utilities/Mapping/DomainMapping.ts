import { PostAdo, TokenAdo } from "Types/Ado";
import { AccountAdo, AccountPublicAdo } from "Types/Ado/AccountAdo";
import { AccessToken, Account, AccountPublic, Post } from "Types/Domain";
import { getDateInSeconds } from "Utilities/Date";

export const getAccessTokenFromTokenAdo = (tokenAdo: TokenAdo): AccessToken => {
  const { access_token, expires_in, refresh_token } = tokenAdo;
  return {
    accessToken: access_token,
    expirationDate: getDateInSeconds(new Date(), expires_in),
    refreshToken: refresh_token,
  };
};

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
