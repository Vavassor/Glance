import { DataTypes, Model, Optional, Sequelize } from "sequelize";

interface AppAttributes {
  client_id: string;
  client_secret: string;
  id: number;
  name: string;
  redirect_uri: string;
  website: string;
}

interface AppCreationAttributes extends Optional<AppAttributes, "id"> {}

export class App
  extends Model<AppAttributes, AppCreationAttributes>
  implements AppAttributes
{
  public client_id!: string;
  public client_secret!: string;
  public id!: number;
  public name!: string;
  public redirect_uri!: string;
  public website!: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

export const createAppModel = (sequelize: Sequelize) => {
  const AppModel = App.init(
    {
      client_id: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      client_secret: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      redirect_uri: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      website: {
        allowNull: false,
        type: DataTypes.STRING,
      },
    },
    { sequelize }
  );

  return AppModel;
};
