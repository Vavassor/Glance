import { AppSpecAdo } from "Types/Ado";
import { AppSpec } from "Types/Domain";

export const getAppSpecFromAppSpecAdo = (appSpecAdo: AppSpecAdo): AppSpec => {
  const { name, redirect_uri, website } = appSpecAdo;
  return {
    name,
    redirectUri: redirect_uri,
    website,
  };
};
