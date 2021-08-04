import { AccountPublic } from "./Account";

export interface Post {
  account: AccountPublic;
  content: string;
  creationDate: string;
  id: string;
  title: string;
}
