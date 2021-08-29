import {
  AccountRegistrationSpecAdo,
  AccountSpecAdo,
  IdAdo,
  IdentifyAccountAdo,
  IdType,
  PasswordUpdateAdo,
  SendPasswordResetAdo,
} from "Types/Ado";
import {
  AccountId,
  AccountIdType,
  AccountRegistrationSpec,
  AccountSpec,
  IdentifyAccount,
  PasswordUpdate,
  SendPasswordReset,
} from "Types/Domain";

export const getAdoFromAccountId = (id: AccountId) => {
  switch (id.type) {
    case AccountIdType.Email: {
      const ado: IdAdo = {
        email: id.email,
        type: IdType.Email,
      };
      return ado;
    }
    case AccountIdType.Username: {
      const ado: IdAdo = {
        type: IdType.Username,
        username: id.username,
      };
      return ado;
    }
  }
};

export const getAdoFromAccountRegistrationSpec = (
  accountRegistrationSpec: AccountRegistrationSpec
) => {
  const { email, password, username } = accountRegistrationSpec;
  const ado: AccountRegistrationSpecAdo = {
    email,
    password,
    username,
  };
  return ado;
};

export const getAdoFromPasswordUpdate = (passwordUpdate: PasswordUpdate) => {
  const { password } = passwordUpdate;
  const ado: PasswordUpdateAdo = {
    password,
  };
  return ado;
};

export const getAdoFromSendPasswordReset = (
  sendPasswordReset: SendPasswordReset
) => {
  const { id, recovery_method } = sendPasswordReset;
  const ado: SendPasswordResetAdo = {
    id: getAdoFromAccountId(id),
    recovery_method,
  };
  return ado;
};

export const getAdoFromAccountSpec = (spec: AccountSpec) => {
  const { accountRegistrationId, verificationCode } = spec;
  const ado: AccountSpecAdo = {
    account_registration_id: accountRegistrationId,
    email_verification_code: verificationCode,
  };
  return ado;
};

export const getAdoFromIdentifyAccount = (identify: IdentifyAccount) => {
  const { query } = identify;
  const ado: IdentifyAccountAdo = {
    query,
  };
  return ado;
};
