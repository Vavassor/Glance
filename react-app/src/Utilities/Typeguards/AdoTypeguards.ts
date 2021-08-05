import { AccountPublicAdo, ErrorAdo, ErrorSingle, PostAdo } from "Types/Ado";
import { every } from "Utilities/Array";
import { isString, isStringOrUndefined } from "./BasicTypeguards";

export const isAccountPublicAdo = (value: any): value is AccountPublicAdo => {
  return (
    typeof value === "object" && isString(value.id) && isString(value.username)
  );
};

export const isErrorAdo = (value: any): value is ErrorAdo => {
  return (
    typeof value === "object" &&
    Array.isArray(value.errors) &&
    every(value.errors, isErrorSingle)
  );
};

export const isErrorSingle = (value: any): value is ErrorSingle => {
  return (
    typeof value === "object" &&
    isString(value.message) &&
    isStringOrUndefined(value.details)
  );
};

export const isPostAdo = (value: any): value is PostAdo => {
  return (
    typeof value === "object" &&
    isAccountPublicAdo(value.account) &&
    isString(value.content) &&
    isString(value.creation_date) &&
    isString(value.id) &&
    isString(value.title)
  );
};

export const isPostAdoArray = (value: any): value is PostAdo[] => {
  return Array.isArray(value) && every(value, isPostAdo);
};
