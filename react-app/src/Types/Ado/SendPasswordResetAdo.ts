import { IdAdo } from "./IdAdo";
import { RecoveryMethodType } from "./IdentifyAccountResultAdo";

interface TokenByEmail {
  id: string;
  type: RecoveryMethodType.Email;
}

type RecoveryMethod = TokenByEmail;

export interface SendPasswordResetAdo {
  id: IdAdo;
  recovery_method: RecoveryMethod;
}
