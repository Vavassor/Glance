import { IdAdo } from "./IdAdo";

export enum RecoveryMethodType {
  Email = "Email",
}

interface RecoveryMethodEmail {
  email: string;
  id: string;
  type: RecoveryMethodType.Email;
}

export type RecoveryMethodAdo = RecoveryMethodEmail;

export interface IdentifyAccountResultAdo {
  id: IdAdo;
  recovery_methods: RecoveryMethodAdo[];
}
