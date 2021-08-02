import { PostModel } from "Models";
import { getPostFromPostModel } from "Utilities/Mapping/Domain";
import { getQuerySelector } from "Utilities/Mongodb";
import { Types } from "mongoose";

export const findAccountTimelinePosts = async (
  accountId: string,
  sinceId: string | undefined,
  untilId: string | undefined,
  limit: number
) => {
  const idQuery = getQuerySelector(sinceId, untilId);
  const conditions = idQuery ? { _id: idQuery } : {};
  const posts = await PostModel.find(
    {
      account: Types.ObjectId(accountId),
      ...conditions,
    },
    undefined,
    {
      sort: "-creation_date",
    }
  )
    .limit(limit)
    .populate({ path: "account" })
    .exec();
  return posts.map(getPostFromPostModel);
};
