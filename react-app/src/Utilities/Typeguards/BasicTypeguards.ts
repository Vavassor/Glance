import { every } from "Utilities/Array";

export const isNumber = (value: any): value is number => {
  return typeof value === "number";
};

export const isNumberArray = (value: any): value is string[] => {
  return Array.isArray(value) && every(value, isNumber);
};

export const isString = (value: any): value is string => {
  return typeof value === "string";
};

export const isStringOrUndefined = (
  value: any
): value is string | undefined => {
  return typeof value === "string" || typeof value === "undefined";
};

export const isStringArray = (value: any): value is string[] => {
  return Array.isArray(value) && every(value, isString);
};
