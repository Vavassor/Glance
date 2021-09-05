import { AccountPublic } from "./Account";

export interface Post {
  account: AccountPublic;
  content: string;
  creationDate: Date;
  id: string;
  title: string;
}

export interface PostSpec {
  content: string;
}
