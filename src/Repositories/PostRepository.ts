import { AccountModel, PostModel } from "Models";
import { getPostFromPostModel } from "Utilities/Mapping/Domain";
import { getQuerySelector } from "Utilities/Sequelize";

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
