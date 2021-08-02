import { Post } from "Entities/Post";
import { getRepository } from "typeorm";
import { getPostFromPostModel } from "Utilities/Mapping/Domain";
import { getQuerySelector } from "Utilities/Typeorm";

export const findAccountTimelinePosts = async (
  accountId: string,
  sinceId: string | undefined,
  untilId: string | undefined,
  limit: number
) => {
  const idQuery = getQuerySelector(sinceId, untilId);
  const conditions = idQuery ? { id: idQuery } : {};
  const repository = getRepository(Post);
  const posts = await repository.find({
    order: {
      creation_date: "DESC",
    },
    relations: ["account"],
    take: limit,
    where: { account: accountId, ...conditions },
  });
  return posts.map(getPostFromPostModel);
};
