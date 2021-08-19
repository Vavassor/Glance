import { IdType } from "Types/IdType";

interface EmailId {
  email: string;
  type: IdType.Email;
}

interface UsernameId {
  type: IdType.Username;
  username: string;
}

export type IdAdo = EmailId | UsernameId;
