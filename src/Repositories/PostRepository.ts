import { AccountModel, PostModel } from "Models";
import { PostSpec } from "Types/Domain";
import { getPostFromPostModel } from "Utilities/Mapping/Domain";
import { getQuerySelector } from "Utilities/Sequelize";

export const createPost = async (accountId: string, spec: PostSpec) => {
  const { content } = spec;
  const createdPost = await PostModel.create({
    AccountId: accountId,
    content,
    title: "Untitled",
  });
  const post = await PostModel.findByPk(createdPost.id, {
    include: AccountModel,
  });
  if (!post) {
    throw new Error("Failed finding a post after its creation.");
  }
  console.log("post", post);
  return getPostFromPostModel(post);
};

export const findAccountTimelinePosts = async (
  accountId: string,
  sinceId: string | undefined,
  untilId: string | undefined,
  limit: number
) => {
  const idQuery = getQuerySelector(sinceId, untilId);
  const conditions = idQuery ? { id: idQuery } : {};
  const posts = await PostModel.findAll({
    include: AccountModel,
    limit,
    order: [["createdAt", "DESC"]],
    where: {
      AccountId: accountId,
      ...conditions,
    },
  });
  return posts.map(getPostFromPostModel);
};
