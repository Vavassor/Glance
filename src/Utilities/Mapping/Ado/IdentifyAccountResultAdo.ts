import {
  IdentifyAccountResultAdo,
  IdType,
  RecoveryMethodType,
} from "Types/Ado";

export const getIdentifyAccountResultAdoFromEmail = (
  email: string,
  obscuredEmail: string,
  id: string
) => {
  const ado: IdentifyAccountResultAdo = {
    id: { email, type: IdType.Email },
    recovery_methods: [
      {
        email: obscuredEmail,
        id,
        type: RecoveryMethodType.Email,
      },
    ],
  };
  return ado;
};

export const getIdentifyAccountResultAdoFromUsername = (
  username: string,
  obscuredEmail: string,
  id: string
) => {
  const ado: IdentifyAccountResultAdo = {
    id: { username, type: IdType.Username },
    recovery_methods: [
      {
        email: obscuredEmail,
        id,
        type: RecoveryMethodType.Email,
      },
    ],
  };
  return ado;
};
