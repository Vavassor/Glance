import {
  AccountAdo,
  AccountPublicAdo,
  AccountRegistrationAdo,
  ErrorAdo,
  ErrorSingle,
  IdAdo,
  IdentifyAccountResultAdo,
  PostAdo,
  RecoveryMethodAdo,
  TokenAdo,
} from "Types/Ado";
import { every } from "Utilities/Array";
import { isNumber, isString, isStringOrUndefined } from "./BasicTypeguards";

export const isAccountAdo = (value: any): value is AccountAdo => {
  return (
    typeof value === "object" &&
    isString(value.email) &&
    isString(value.id) &&
    isString(value.username)
  );
};

export const isAccountPublicAdo = (value: any): value is AccountPublicAdo => {
  return (
    typeof value === "object" && isString(value.id) && isString(value.username)
  );
};

export const isAccountRegistrationAdo = (
  value: any
): value is AccountRegistrationAdo => {
  return (
    typeof value === "object" &&
    isString(value.email) &&
    isString(value.id) &&
    isString(value.username)
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

export const isIdAdo = (value: any): value is IdAdo => {
  return (
    typeof value === "object" &&
    isString(value.type) &&
    ((value.type === "Email" && isString(value.email)) ||
      (value.type === "Username" && isString(value.username)))
  );
};

export const isIdentifyAccountResultAdo = (
  value: any
): value is IdentifyAccountResultAdo => {
  return (
    typeof value === "object" &&
    isIdAdo(value.id) &&
    every(value.recovery_methods, isRecoveryMethodAdo)
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

export const isRecoveryMethodAdo = (value: any): value is RecoveryMethodAdo => {
  return (
    typeof value === "object" &&
    isString(value.type) &&
    value.type === "Email" &&
    isString(value.id) &&
    isString(value.email)
  );
};

export const isTokenAdo = (value: any): value is TokenAdo => {
  return (
    typeof value === "object" &&
    isString(value.access_token) &&
    isNumber(value.expires_in) &&
    isStringOrUndefined(value.refresh_token) &&
    isStringOrUndefined(value.scope) &&
    isString(value.token_type)
  );
};
