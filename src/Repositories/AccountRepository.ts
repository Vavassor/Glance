import { AccountModel } from "Models";
import { AccountSpec } from "Types/Domain";
import { getAccountFromAccountModel } from "Utilities/Mapping/Domain";
import { hash } from "Utilities/Password";

export const createAccount = async (spec: AccountSpec) => {
  const { email, password, username } = spec;
  const hashedPassword = await hash(password);
  const accountModel = await AccountModel.create({
    email,
    password: hashedPassword,
    username,
  });
  return getAccountFromAccountModel(accountModel);
};

export const deleteAccount = async (id: string) => {
  AccountModel.destroy({ where: { id } });
};

export const findAccountById = async (id: string) => {
  const accountModel = await AccountModel.findOne({ where: { id } });
  if (!accountModel) {
    return null;
  }
  return getAccountFromAccountModel(accountModel);
};
