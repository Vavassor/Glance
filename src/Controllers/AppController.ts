import { RequestHandler } from "express";
import * as AppRepository from "Repositories/AppRepository";
import { AppAdo, AppSpecAdo, ErrorAdo } from "Types/Ado";
import { ParamsDictionary, ParsedQs } from "Types/Express";
import { getAppAdoFromApp } from "Utilities/Mapping/Ado";
import { getAppSpecFromAppSpecAdo } from "Utilities/Mapping/Domain/AppSpecMapping";
import { hash } from "Utilities/Password";
import { getRandomBase64 } from "Utilities/Random";
import { v5 as uuidv5 } from "uuid";

export const createApp: RequestHandler<
  ParamsDictionary,
  AppAdo | ErrorAdo,
  AppSpecAdo,
  ParsedQs
> = async (request, response, next) => {
  const appSpec = getAppSpecFromAppSpecAdo(request.body);
  const clientId = uuidv5(appSpec.website, uuidv5.URL);
  const clientSecret = getRandomBase64(32);
  const hashedClientSecret = await hash(clientSecret);
  const app = await AppRepository.createApp(
    appSpec,
    clientId,
    hashedClientSecret
  );
  response.json(getAppAdoFromApp(app, clientSecret));
};
