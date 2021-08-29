import {
  AccountRegistrationAdo,
  IdAdo,
  IdentifyAccountResultAdo,
  IdType,
  PostAdo,
  TokenAdo,
} from "Types/Ado";
import { AccountAdo, AccountPublicAdo } from "Types/Ado/AccountAdo";
import {
  AccessToken,
  Account,
  AccountId,
  AccountIdType,
  AccountPublic,
  AccountRegistration,
  IdentifyAccountResult,
  Post,
} from "Types/Domain";
import { getDateInSeconds } from "Utilities/Date";

export const getAccessTokenFromTokenAdo = (tokenAdo: TokenAdo): AccessToken => {
  const { access_token, expires_in, refresh_token } = tokenAdo;
  return {
    accessToken: access_token,
    expirationDate: getDateInSeconds(new Date(), expires_in).toISOString(),
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

export const getAccountIdFromAdo = (ado: IdAdo) => {
  switch (ado.type) {
    case IdType.Email: {
      const accountId: AccountId = {
        email: ado.email,
        type: AccountIdType.Email,
      };
      return accountId;
    }
    case IdType.Username: {
      const accountId: AccountId = {
        type: AccountIdType.Username,
        username: ado.username,
      };
      return accountId;
    }
  }
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

export const getAccountRegistrationFromAdo = (ado: AccountRegistrationAdo) => {
  const { email, id, username } = ado;
  const accountRegistration: AccountRegistration = {
    email,
    id,
    username,
  };
  return accountRegistration;
};

export const getIdentifyAccountResultFromAdo = (
  ado: IdentifyAccountResultAdo
) => {
  const { id, recovery_methods } = ado;
  const identifyAccountResult: IdentifyAccountResult = {
    id: getAccountIdFromAdo(id),
    recoveryMethods: recovery_methods,
  };
  return identifyAccountResult;
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
