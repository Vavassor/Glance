import {
  BelongsToGetAssociationMixin,
  BelongsToSetAssociationMixin,
  DataTypes,
  Model,
  Optional,
  Sequelize,
} from "sequelize";
import { Account } from "./AccountModel";

interface PostAttributes {
  Account?: Account;
  AccountId?: string;
  content: string;
  id: number;
  title: string;
}

interface PostCreationAttributes extends Optional<PostAttributes, "id"> {}

export class Post
  extends Model<PostAttributes, PostCreationAttributes>
  implements PostAttributes
{
  public Account?: Account;
  public AccountId?: string;
  public content!: string;
  public id!: number;
  public name!: string;
  public ownerId!: number;
  public title!: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  public getAccount!: BelongsToGetAssociationMixin<Account>;
  public setAccount!: BelongsToSetAssociationMixin<Account, number>;
}

export const createPostModel = (sequelize: Sequelize) => {
  const PostModel = Post.init(
    {
      content: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
      },
      title: {
        allowNull: false,
        type: DataTypes.STRING,
      },
    },
    { sequelize }
  );

  return PostModel;
};
