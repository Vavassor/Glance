import { DataTypes, Model, Optional, Sequelize } from "sequelize";

interface RefreshTokenAttributes {
  account_id: string;
  client_id: string;
  id: number;
}

interface RefreshTokenCreationAttributes
  extends Optional<RefreshTokenAttributes, "id"> {}

export class RefreshToken
  extends Model<RefreshTokenAttributes, RefreshTokenCreationAttributes>
  implements RefreshTokenAttributes
{
  public account_id!: string;
  public client_id!: string;
  public id!: number;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

export const createRefreshTokenModel = (sequelize: Sequelize) => {
  const RefreshTokenModel = RefreshToken.init(
    {
      account_id: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      client_id: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
      },
    },
    { sequelize }
  );

  return RefreshTokenModel;
};
