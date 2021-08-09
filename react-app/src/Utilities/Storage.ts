import { AccessToken } from "Types/Domain";
import { StoredAccessToken, StoredAccount } from "Types/Storage";
import { findById, findIndexById } from "./Array";
import { isStoredAccountArray } from "./Typeguards/StorageTypeguards";

const accountsKey = "accounts";

const storeAccounts = (accounts: StoredAccount[]) => {
  localStorage.setItem(accountsKey, JSON.stringify(accounts));
};

export const createStoredAccount = (
  token: AccessToken,
  accountId: string
): StoredAccount => {
  const { refreshToken } = token;

  if (!refreshToken) {
    throw new Error("Expected a refresh token when storing an account.");
  }

  return {
    access_token: createStoredAccessToken(token),
    id: accountId,
    refresh_token: refreshToken,
  };
};

export const createStoredAccessToken = (
  token: AccessToken
): StoredAccessToken => {
  const { accessToken, expirationDate } = token;

  return {
    access_token: accessToken,
    expiration_date: expirationDate,
  };
};

export const loadAccount = (accountId: string): StoredAccount | undefined => {
  const accounts = loadAccounts();
  const account = findById(accounts, accountId);
  return account;
};

export const loadAccounts = (): StoredAccount[] => {
  const json = localStorage.getItem(accountsKey);
  const accounts = json ? JSON.parse(json) : [];

  if (!isStoredAccountArray(accounts)) {
    throw new Error(`Failed loading "${accountsKey}" from storage.`);
  }

  return accounts;
};

export const removeAccount = (accountId: string) => {
  const accounts = loadAccounts();
  const foundIndex = findIndexById(accounts, accountId);
  accounts.splice(foundIndex, 1);
  storeAccounts(accounts);
};

export const storeAccount = (account: StoredAccount) => {
  const accounts = loadAccounts();
  const foundIndex = findIndexById(accounts, account.id);
  if (foundIndex === -1) {
    accounts.push(account);
  } else {
    accounts[foundIndex] = account;
  }
  storeAccounts(accounts);
};
