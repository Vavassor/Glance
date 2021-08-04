import { Sequelize } from "sequelize";
import { config } from "Utilities/Config";
import { Account, createAccountModel } from "./AccountModel";
import { createPostModel, Post } from "./PostModel";

export const sequelize = new Sequelize({
  database: "glance",
  dialect: "mysql",
  host: config.mysqlHost,
  password: config.mysqlPassword,
  port: config.mysqlPort,
  username: config.mysqlUsername,
});

export const AccountModel = createAccountModel(sequelize);
export const PostModel = createPostModel(sequelize);

AccountModel.hasMany(PostModel);
PostModel.belongsTo(AccountModel);

export type { Account, Post };

