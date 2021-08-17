import { AccountRegistrationModel } from "Models";
import { AccountRegistrationSpec } from "Types/Domain";
import { getAccountRegistrationFromModel } from "Utilities/Mapping/Domain";

export const createAccountRegistration = async (
  spec: AccountRegistrationSpec
) => {
  const { email, emailVerificationCode, password, username } = spec;
  const [model] = await AccountRegistrationModel.findOrCreate({
    defaults: {
      email,
      email_verification_code: emailVerificationCode,
      password,
      username,
    },
    where: { email },
  });
  return getAccountRegistrationFromModel(model);
};

export const findAccountRegistrationById = async (id: string) => {
  const model = await AccountRegistrationModel.findByPk(id);
  if (!model) {
    return null;
  }
  return getAccountRegistrationFromModel(model);
};
