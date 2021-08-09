import { AccessTokenPayload } from "Types/Domain";
import { isString } from "./BasicTypeguards";

export const isAccessTokenPayload = (
  value: any
): value is AccessTokenPayload => {
  return typeof value === "object" && isString(value.sub);
};
