import { AccountModel, AppModel, PostModel } from "Models";
import { AccountSpec, AppSpec } from "Types/Domain";
import { hash } from "Utilities/Password";
import { getRandomBase64 } from "Utilities/Random";
import { v5 as uuidv5 } from "uuid";

const seedAccount = async (accountSpec: AccountSpec) => {
  const { email, username } = accountSpec;
  const password = await hash(accountSpec.password);
  const account = await AccountModel.create({ email, password, username });
  return account;
};

const seedApp = async (appSpec: AppSpec) => {
  const { name, redirectUri, website } = appSpec;
  const clientId = uuidv5(website, uuidv5.URL);
  const clientSecret = getRandomBase64(32);
  const hashedClientSecret = await hash(clientSecret);
  const app = await AppModel.create({
    client_id: clientId,
    client_secret: hashedClientSecret,
    name,
    redirect_uri: redirectUri,
    website,
  });
  return app;
};

export const seedDatabase = async () => {
  const vavassor = await seedAccount({
    email: "dawso.andrew@gmail.com",
    password: "password",
    username: "vavassor",
  });
  await seedApp({
    name: "Glance Web",
    redirectUri: "http://localhost:3001/auth",
    website: "http://localhost:3001",
  });
  const post = await PostModel.create({
    content: "something",
    title: "Untitled",
  });
  post.setAccount(vavassor);
};
