import type { RefreshToken as RefreshTokenModel } from "Models";
import { RefreshToken } from "Types/Domain";

export const getRefreshTokenFromRefreshTokenModel = (
  model: RefreshTokenModel
) => {
  const { account_id, client_id, id } = model;
  const refreshToken: RefreshToken = {
    accountId: account_id,
    clientId: client_id,
    id: id.toString(),
  };
  return refreshToken;
};
