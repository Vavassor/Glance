import { AppModel } from "Models";
import { AppSpec } from "Types/Domain/AppSpec";
import { getAppFromAppModel } from "Utilities/Mapping/Domain";

export const createApp = async (
  spec: AppSpec,
  clientId: string,
  clientSecret: string
) => {
  const { name, redirectUri, website } = spec;
  const appModel = await AppModel.create({
    client_id: clientId,
    client_secret: clientSecret,
    name,
    redirect_uri: redirectUri,
    website,
  });
  return getAppFromAppModel(appModel);
};

export const findAppByClientId = async (clientId: string) => {
  const appModel = await AppModel.findOne({ where: { client_id: clientId } });
  if (!appModel) {
    return null;
  }
  return getAppFromAppModel(appModel);
};
