import { AccountId, RecoveryMethodType } from "./IdentifyAccountResult";

interface TokenByEmail {
  id: string;
  type: RecoveryMethodType.Email;
}

type RecoveryMethod = TokenByEmail;

export interface SendPasswordReset {
  id: AccountId;
  recovery_method: RecoveryMethod;
}
