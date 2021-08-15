import { randomBytes, randomFill, randomInt } from "crypto";

export const getRandomBase10 = (size: number) => {
  return randomInt(0, Math.pow(10, size)).toString(10).padStart(size, "0");
};

export const getRandomBase64 = (size: number) => {
  return randomBytes(size).toString("base64");
};
