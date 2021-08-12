import { Options, Sequelize } from "sequelize";
import { config } from "Utilities/Config";
import { Account, createAccountModel } from "./AccountModel";
import { App, createAppModel } from "./AppModel";
import { createPostModel, Post } from "./PostModel";
import { createRefreshTokenModel, RefreshToken } from "./RefreshTokenModel";

const separateOptions: Options = {
  host: config.mysqlHost,
  password: config.mysqlPassword,
  port: config.mysqlPort,
  username: config.mysqlUsername,
};

const connectionUrlOptions: Options = {
  storage: config.mysqlConnectionUrl,
};

const connectionOptions = !!config.mysqlConnectionUrl
  ? connectionUrlOptions
  : separateOptions;

export const sequelize = new Sequelize({
  database: "glance",
  dialect: "mysql",
  ...connectionOptions,
});

export const AccountModel = createAccountModel(sequelize);
export const AppModel = createAppModel(sequelize);
export const PostModel = createPostModel(sequelize);
export const RefreshTokenModel = createRefreshTokenModel(sequelize);

AccountModel.hasMany(PostModel);
PostModel.belongsTo(AccountModel);

export type { Account, App, Post, RefreshToken };
