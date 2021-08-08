import { TokenAdo } from "Types/Ado";
import { Token } from "Types/Domain";

export const getTokenAdoFromToken = (token: Token) => {
  const { accessToken, expiresIn, refreshToken } = token;
  const tokenAdo: TokenAdo = {
    access_token: accessToken,
    expires_in: expiresIn,
    refresh_token: refreshToken,
    token_type: "bearer",
  };
  return tokenAdo;
};
