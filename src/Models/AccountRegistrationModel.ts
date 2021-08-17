import { DataTypes, Model, Optional, Sequelize } from "sequelize";

interface AccountRegistrationAttributes {
  email: string;
  email_verification_code: string;
  id: number;
  password: string;
  username: string;
}

interface AccountRegistrationCreationAttributes
  extends Optional<AccountRegistrationAttributes, "id"> {}

export class AccountRegistration
  extends Model<
    AccountRegistrationAttributes,
    AccountRegistrationCreationAttributes
  >
  implements AccountRegistrationAttributes
{
  public email!: string;
  public email_verification_code!: string;
  public id!: number;
  public name!: string;
  public password!: string;
  public username!: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

export const createAccountRegistrationModel = (sequelize: Sequelize) => {
  const AccountRegistrationModel = AccountRegistration.init(
    {
      email: {
        allowNull: false,
        type: DataTypes.STRING,
        unique: true,
      },
      email_verification_code: {
        allowNull: false,
        type: DataTypes.STRING,
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

  return AccountRegistrationModel;
};
