import { StoredAccessToken, StoredAccount } from "Types/Storage";
import { every } from "Utilities/Array";
import { isString } from "./BasicTypeguards";

export const isStoredAccessToken = (value: any): value is StoredAccessToken => {
  return (
    typeof value === "object" &&
    isString(value.access_token) &&
    isString(value.expiration_date)
  );
};

export const isStoredAccount = (value: any): value is StoredAccount => {
  return (
    typeof value === "object" &&
    isStoredAccessToken(value.access_token) &&
    isString(value.id) &&
    isString(value.refresh_token)
  );
};

export const isStoredAccountArray = (value: any): value is StoredAccount[] => {
  return Array.isArray(value) && every(value, isStoredAccount);
};
