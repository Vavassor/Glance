import jwtDecode from "jwt-decode";
import { isAccessTokenPayload } from "Utilities/Typeguards";

export const getAccessTokenPayload = (accessToken: string) => {
  const payload = jwtDecode(accessToken);
  if (!isAccessTokenPayload(payload)) {
    return null;
  }
  console.log(`access token payload`, payload);
  return payload;
};
