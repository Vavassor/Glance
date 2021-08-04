import {
  BelongsToSetAssociationMixin,
  DataTypes,
  Model,
  Sequelize,
} from "sequelize";
import { Account } from "./AccountModel";

interface PostAttributes {
  Account?: Account;
  AccountId?: string;
  content: string;
  title: string;
}

interface PostCreationAttributes extends PostAttributes {}

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

  public setAccount!: BelongsToSetAssociationMixin<Account, number>;
}

export const createPostModel = (sequelize: Sequelize) => {
  const PostModel = Post.init(
    {
      content: {
        allowNull: false,
        type: DataTypes.STRING,
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
