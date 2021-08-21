import { AccountRegistrationSpec } from "Types/Domain";
import { getAdoFromAccountRegistrationSpec } from "Utilities/Mapping/AdoMapping";
import { getAccountRegistrationFromAdo } from "Utilities/Mapping/DomainMapping";
import { isAccountRegistrationAdo } from "Utilities/Typeguards";
import { callApi } from "./ApiUtilities";

export const createAccountRegistration = async (
  spec: AccountRegistrationSpec
) => {
  const specAdo = getAdoFromAccountRegistrationSpec(spec);

  const accountRegistrationAdo = await callApi("account-registration", {
    body: specAdo,
    method: "POST",
  });

  if (!isAccountRegistrationAdo(accountRegistrationAdo)) {
    throw new Error(
      'The response body was not the expected type "AccountRegistrationAdo".'
    );
  }

  return getAccountRegistrationFromAdo(accountRegistrationAdo);
};
