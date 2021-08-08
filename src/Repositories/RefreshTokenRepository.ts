import { RefreshTokenModel } from "Models";
import { RefreshTokenSpec } from "Types/Domain";
import { getRefreshTokenFromRefreshTokenModel } from "Utilities/Mapping/Domain";

export const createRefreshToken = async (spec: RefreshTokenSpec) => {
  const { accountId, clientId } = spec;
  const refreshTokenModel = await RefreshTokenModel.create({
    account_id: accountId,
    client_id: clientId,
  });
  return getRefreshTokenFromRefreshTokenModel(refreshTokenModel);
};

export const findRefreshTokenById = async (refreshTokenId: string) => {
  const refreshTokenModel = await RefreshTokenModel.findByPk(refreshTokenId);
  if (!refreshTokenModel) {
    return null;
  }
  return getRefreshTokenFromRefreshTokenModel(refreshTokenModel);
};
