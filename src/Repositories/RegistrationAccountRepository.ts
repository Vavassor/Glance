import { AccountRegistrationModel } from "Models";
import { AccountRegistrationSpec } from "Types/Domain";
import { getAccountRegistrationFromModel } from "Utilities/Mapping/Domain";

export const createRegistrationAccount = async (
  spec: AccountRegistrationSpec
) => {
  const { email, emailVerificationCode, password, username } = spec;
  const [accountModel] = await AccountRegistrationModel.findOrCreate({
    defaults: {
      email,
      email_verification_code: emailVerificationCode,
      password,
      username,
    },
    where: { email },
  });
  return getAccountRegistrationFromModel(accountModel);
};
