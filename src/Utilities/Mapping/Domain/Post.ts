import { Post } from "Types/Domain";
import { Post as PostModel } from "Models";
import { getAccountPublicFromAccountModel } from "./Account";

export const getPostFromPostModel = (model: PostModel): Post => {
  const post: Post = {
    account: getAccountPublicFromAccountModel(model.Account!),
    content: model.content,
    creationDate: model.createdAt.toISOString(),
    id: model.id.toString(),
    title: model.title,
  };
  return post;
};
