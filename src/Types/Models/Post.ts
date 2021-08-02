import { Types } from "mongoose";

export interface PostModel {
  account: Types.ObjectId;
  content: string;
  title: string;
}
