import { AccountSpec } from "Types/Domain";
import { getAdoFromAccountSpec } from "Utilities/Mapping/AdoMapping";
import { getAccountFromAccountAdo } from "Utilities/Mapping/DomainMapping";
import { isAccountAdo } from "Utilities/Typeguards";
import { callApi } from "./ApiUtilities";

export const createAccount = async (spec: AccountSpec) => {
  const ado = getAdoFromAccountSpec(spec);

  const account = await callApi("account", { body: ado, method: "POST" });

  if (!isAccountAdo(account)) {
    throw new Error(
      "The response body was not the expected type 'AccountAdo'."
    );
  }

  return getAccountFromAccountAdo(account);
};
