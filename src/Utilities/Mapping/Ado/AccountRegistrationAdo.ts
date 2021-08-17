import { AccountRegistrationAdo } from "Types/Ado";
import { AccountRegistration } from "Types/Domain";

export const getAdoFromAccountRegistration = (account: AccountRegistration) => {
  const { email, id, username } = account;
  const ado: AccountRegistrationAdo = {
    email,
    id,
    username,
  };
  return ado;
};
