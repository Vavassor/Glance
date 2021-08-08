import { App } from "Types/Domain";
import type { App as AppModel } from "Models";

export const getAppFromAppModel = (appModel: AppModel) => {
  const { client_id, client_secret, id, name, redirect_uri, website } =
    appModel;
  const app: App = {
    clientId: client_id,
    clientSecret: client_secret,
    id: id.toString(),
    name,
    redirectUri: redirect_uri,
    website,
  };
  return app;
};
