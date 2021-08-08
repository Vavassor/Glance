import { AppAdo } from "Types/Ado";
import { App } from "Types/Domain";

export const getAppAdoFromApp = (app: App, clientSecret: string): AppAdo => {
  const { clientId, id, name, redirectUri, website } = app;
  return {
    client_id: clientId,
    client_secret: clientSecret,
    name,
    redirect_uri: redirectUri,
    id,
    website,
  };
};
