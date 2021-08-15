import {
  Association,
  DataTypes,
  HasManyAddAssociationMixin,
  HasManyCountAssociationsMixin,
  HasManyCreateAssociationMixin,
  HasManyGetAssociationsMixin,
  HasManyHasAssociationMixin,
  Model,
  Optional,
  Sequelize,
} from "sequelize";
import { Post } from "./PostModel";

interface AccountAttributes {
  email: string;
  id: number;
  password: string;
  username: string;
}

interface AccountCreationAttributes extends Optional<AccountAttributes, "id"> {}

export class Account
  extends Model<AccountAttributes, AccountCreationAttributes>
  implements AccountAttributes
{
  public email!: string;
  public id!: number;
  public name!: string;
  public password!: string;
  public username!: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  public getPosts!: HasManyGetAssociationsMixin<Post>;
  public addPost!: HasManyAddAssociationMixin<Post, number>;
  public hasPost!: HasManyHasAssociationMixin<Post, number>;
  public countPosts!: HasManyCountAssociationsMixin;
  public createPost!: HasManyCreateAssociationMixin<Post>;

  public readonly posts?: Post[];

  public static associations: {
    posts: Association<Account, Post>;
  };
}

export const createAccountModel = (sequelize: Sequelize) => {
  const AccountModel = Account.init(
    {
      email: {
        allowNull: false,
        type: DataTypes.STRING,
        unique: true,
      },
      id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
      },
      password: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      username: {
        allowNull: false,
        type: DataTypes.STRING,
        unique: true,
      },
    },
    { sequelize }
  );

  return AccountModel;
};
