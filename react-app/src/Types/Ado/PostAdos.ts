import { AccountPublicAdo } from "./AccountAdo";

export interface PostAdo {
  account: AccountPublicAdo;
  content: string;
  creation_date: string;
  id: string;
  title: string;
}

export interface PostSpecAdo {
  content: string;
}
