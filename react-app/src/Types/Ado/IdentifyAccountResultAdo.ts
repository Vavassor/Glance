import { IdAdo } from "Types/Ado/IdAdo";

interface RecoveryMethodEmail {
  email: string;
  id: string;
  type: RecoveryMethodType.Email;
}

export interface IdentifyAccountResultAdo {
  id: IdAdo;
  recovery_methods: RecoveryMethodAdo[];
}

export type RecoveryMethodAdo = RecoveryMethodEmail;

export enum RecoveryMethodType {
  Email = "Email",
}
