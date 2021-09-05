import { AccountModel, PostModel } from "Models";
import { PostSpec } from "Types/Domain";
import { getPostFromPostModel } from "Utilities/Mapping/Domain";
import { getQuerySelector } from "Utilities/Sequelize";

export const createPost = async (spec: PostSpec) => {
  const { content } = spec;
  const post = await PostModel.create({
    content,
    title: "Untitled",
  });
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
