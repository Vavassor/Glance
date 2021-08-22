import { AccountModel, AccountRegistrationModel, sequelize } from "Models";
import { AccountSpec } from "Types/Domain";
import { getAccountFromAccountModel } from "Utilities/Mapping/Domain";

export const createAccount = async (
  spec: AccountSpec,
  registrationId: string
) => {
  const { email, password, username } = spec;
  const accountModel = await sequelize.transaction(async (transaction) => {
    await AccountRegistrationModel.destroy({
      transaction,
      where: { id: registrationId },
    });
    return await AccountModel.create(
      {
        email,
        password,
        username,
      },
      { transaction }
    );
  });

  return getAccountFromAccountModel(accountModel);
};

export const deleteAccount = async (id: string) => {
  AccountModel.destroy({ where: { id } });
};

export const findAccountByEmail = async (email: string) => {
  const accountModel = await AccountModel.findOne({ where: { email } });
  if (!accountModel) {
    return null;
  }
  return getAccountFromAccountModel(accountModel);
};

export const findAccountById = async (id: string) => {
  const accountModel = await AccountModel.findByPk(id);
  if (!accountModel) {
    return null;
  }
  return getAccountFromAccountModel(accountModel);
};

export const findAccountByUsername = async (username: string) => {
  const accountModel = await AccountModel.findOne({ where: { username } });
  if (!accountModel) {
    return null;
  }
  return getAccountFromAccountModel(accountModel);
};

export const updatePasswordForAccount = async (
  password: string,
  accountId: string
) => {
  await AccountModel.update({ password }, { where: { id: accountId } });
};
