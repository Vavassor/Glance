import { Document } from "mongoose";
import { Post } from "Types/Domain";
import { PostModel } from "Types/Models";
import { getAccountPublicFromAccountModel } from "./Account";

export const getPostFromPostModel = (
  model: PostModel & Document<any, any, PostModel>
): Post => {
  const timestamp = model._id.getTimestamp();
  const post: Post = {
    account: getAccountPublicFromAccountModel(model.account),
    content: model.content,
    creationDate: timestamp.toISOString(),
    id: model.id,
    title: model.title,
  };
  return post;
};
