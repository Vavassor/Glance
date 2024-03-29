import { Sequelize } from "sequelize";
import { config } from "Utilities/Config";
import { Account, createAccountModel } from "./AccountModel";
import { App, createAppModel } from "./AppModel";
import { createPostModel, Post } from "./PostModel";
import { createRefreshTokenModel, RefreshToken } from "./RefreshTokenModel";
import {
  createAccountRegistrationModel,
  AccountRegistration,
} from "./AccountRegistrationModel";

export const sequelize = !!config.mysqlConnectionUri
  ? new Sequelize(config.mysqlConnectionUri)
  : new Sequelize({
      database: "glance",
      dialect: "mysql",
      host: config.mysqlHost,
      password: config.mysqlPassword,
      port: config.mysqlPort,
      username: config.mysqlUsername,
    });

export const AccountModel = createAccountModel(sequelize);
export const AccountRegistrationModel =
  createAccountRegistrationModel(sequelize);
export const AppModel = createAppModel(sequelize);
export const PostModel = createPostModel(sequelize);
export const RefreshTokenModel = createRefreshTokenModel(sequelize);

AccountModel.hasMany(PostModel);
PostModel.belongsTo(AccountModel);

export type { Account, AccountRegistration, App, Post, RefreshToken };
