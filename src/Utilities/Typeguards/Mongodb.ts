import { isValidObjectId } from "mongoose";

export const isObjectId = (value: any): value is string => {
  if (!isValidObjectId(value)) {
    throw new Error("The ID format is invalid.");
  }
  return true;
};
