interface EmailId {
  email: string;
  type: AccountIdType.Email;
}

interface RecoveryMethodEmail {
  email: string;
  id: string;
  type: RecoveryMethodType.Email;
}

interface UsernameId {
  type: AccountIdType.Username;
  username: string;
}

export type AccountId = EmailId | UsernameId;

export enum AccountIdType {
  Email = "Email",
  Username = "Username",
}

export interface IdentifyAccountResult {
  id: AccountId;
  recoveryMethods: RecoveryMethod[];
}

export type RecoveryMethod = RecoveryMethodEmail;

export enum RecoveryMethodType {
  Email = "Email",
}
