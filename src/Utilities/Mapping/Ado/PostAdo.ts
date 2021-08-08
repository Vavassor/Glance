import { PostAdo } from "Types/Ado/PostAdo";
import { Post } from "Types/Domain";
import { getAccountPublicAdoFromAccountPublic } from "./AccountPublicAdo";

export const getPostAdoFromPost = (post: Post): PostAdo => {
  const { account, content, creationDate, id, title } = post;
  return {
    account: getAccountPublicAdoFromAccountPublic(account),
    content,
    creation_date: creationDate,
    id,
    title,
  };
};
