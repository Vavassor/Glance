import { isString } from "Utilities/Typeguards";

export const isObjectId = (value: any): value is number => {
  if (!isString(value)) {
    return false;
  }
  const parsedValue = parseInt(value);
  if (Number.isNaN(parsedValue)) {
    return false;
  }
  return parsedValue >= 0;
};
