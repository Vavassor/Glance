import { AccountRegistrationModel } from "Models";
import { AccountRegistrationSpec } from "Types/Domain";
import { getAccountRegistrationFromModel } from "Utilities/Mapping/Domain";

export const createAccountRegistration = async (
  spec: AccountRegistrationSpec
) => {
  const { email, emailVerificationCode, password, username } = spec;
  const [model] = await AccountRegistrationModel.upsert(
    {
      email,
      email_verification_code: emailVerificationCode,
      password,
      username,
    },
  );
  return getAccountRegistrationFromModel(model);
};

export const findAccountRegistrationById = async (id: string) => {
  const model = await AccountRegistrationModel.findByPk(id);
  if (!model) {
    return null;
  }
  return getAccountRegistrationFromModel(model);
};
