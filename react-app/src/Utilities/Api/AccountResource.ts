import { AccountSpec, IdentifyAccount, SendPasswordReset } from "Types/Domain";
import {
  getAdoFromAccountSpec,
  getAdoFromIdentifyAccount,
  getAdoFromSendPasswordReset,
} from "Utilities/Mapping/AdoMapping";
import {
  getAccountFromAccountAdo,
  getIdentifyAccountResultFromAdo,
} from "Utilities/Mapping/DomainMapping";
import { isAccountAdo, isIdentifyAccountResultAdo } from "Utilities/Typeguards";
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

export const identifyAccount = async (identify: IdentifyAccount) => {
  const ado = getAdoFromIdentifyAccount(identify);

  const result = await callApi("account/identify", {
    body: ado,
    method: "POST",
  });

  if (!isIdentifyAccountResultAdo(result)) {
    throw new Error(
      'The response body was not the expected type "IdentifyAccountResultAdo".'
    );
  }

  return getIdentifyAccountResultFromAdo(result);
};

export const sendPasswordReset = async (
  sendPasswordReset: SendPasswordReset
) => {
  const ado = getAdoFromSendPasswordReset(sendPasswordReset);

  await callApi("account/send_password_reset", {
    body: ado,
    method: "POST",
  });
};
